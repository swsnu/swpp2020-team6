import json
from json import JSONDecodeError
from .models import Roadmap
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
    JsonResponse,
)
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from section.models import Section
from task.models import Task
from tag.models import Tag
from user.models import User


def roadmap(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            new_private = req_data["private"]
            new_title = req_data["title"]
            new_level = req_data["level"]
            new_description = req_data["description"]
            section_list = req_data["sections"]
            tag_list = req_data["tags"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        new_roadmap = Roadmap(
            private=new_private,
            title=new_title,
            level=new_level,
            description=new_description,
            original_author=request.user,
            author=request.user,
        )
        new_roadmap.save()

        # Add tags m2m field in new_roadmap
        for tag in tag_list:
            tag_query = Tag.objects.filter(tag_name__iexact=tag)
            if tag_query.exists():
                new_roadmap.tags.add(tag_query.first())
            else:
                new_tag = Tag(tag_name=tag)
                new_tag.save()
                new_roadmap.tags.add(new_tag)

        new_roadmap.save()

        # Add sections and tasks of this roadmap
        for section in section_list:
            new_section = Section(title=section["section_title"], roadmap=new_roadmap)
            new_section.save()

            task_list = section["tasks"]
            for task in task_list:
                Task(
                    title=task["task_title"],
                    url=task["task_url"],
                    type=task["task_type"],
                    description=task["task_description"],
                    roadmap=new_roadmap,
                    section=new_section,
                ).save()

        # Post response
        roadmap_dict_simple = new_roadmap.to_dict_simple()
        return JsonResponse(roadmap_dict_simple, status=201)

    return HttpResponseNotAllowed(["POST"])


def roadmap_id(request, roadmap_id):
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        roadmap_dict = roadmap.to_dict()
        return JsonResponse(roadmap_dict)

    elif request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if not roadmap.author_id == request.user.id:
            return HttpResponseForbidden()
        try:
            req_data = json.loads(request.body.decode())
            new_private = req_data["private"]
            new_title = req_data["title"]
            new_level = req_data["level"]
            new_description = req_data["description"]
            section_list = req_data["sections"]
            added_tag_list = req_data["addedTagList"]
            deleted_tag_list = req_data["deletedTagList"]

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # Edit
        roadmap.delete_sections()
        roadmap.private = new_private
        roadmap.title = new_title
        roadmap.level = new_level
        roadmap.description = new_description
        for section in section_list:
            new_section = Section(title=section["section_title"], roadmap=roadmap)
            new_section.save()

            task_list = section["tasks"]
            for task in task_list:
                Task(
                    title=task["task_title"],
                    url=task["task_url"],
                    type=task["task_type"],
                    description=task["task_description"],
                    roadmap=roadmap,
                    section=new_section,
                ).save()

        # Set default value or non-changing
        roadmap.date = datetime.now()
        roadmap.progress = 1

        roadmap.save()

        # Delete tags in roadmap
        for tag in deleted_tag_list:
            tag_query = roadmap.tags.filter(tag_name__iexact=tag)
            if tag_query.exists():
                roadmap.tags.remove(tag_query.first())

        # Add new tags m2m field in roadmap
        for tag in added_tag_list:
            tag_query = Tag.objects.filter(tag_name__iexact=tag)
            if tag_query.exists():
                roadmap.tags.add(tag_query.first())
            else:
                new_tag = Tag(tag_name=tag)
                new_tag.save()
                roadmap.tags.add(new_tag)

        roadmap.save()
        roadmap_dict_simple = roadmap.to_dict_simple()
        return JsonResponse(roadmap_dict_simple, status=200)

    elif request.method == "DELETE":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if not roadmap.author_id == request.user.id:
            return HttpResponseForbidden()

        roadmap.delete()
        return HttpResponse(status=204)

    elif request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        new_roadmap = Roadmap(
            private=roadmap.private,
            title=roadmap.title,
            level=roadmap.level,
            description=roadmap.description,
            original_author=roadmap.author,
            author=request.user,
        )
        new_roadmap.save()

        # Add copied tags m2m fields
        for tag in roadmap.tags.all():
            new_roadmap.tags.add(tag)
        new_roadmap.save()

        # Add copied sections and tasks
        for section in roadmap.section_roadmap.all():
            new_section = Section(title=section.title, roadmap=new_roadmap)
            new_section.save()

            for task in section.task_section.all():
                Task(
                    title=task.title,
                    url=task.url,
                    type=task.type,
                    description=task.description,
                    roadmap=new_roadmap,
                    section=new_section,
                ).save()

        # Post response
        roadmap_dict_simple = new_roadmap.to_dict_simple()
        return JsonResponse(roadmap_dict_simple, status=201)


def roadmap_id_like(request, roadmap_id):
    if request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
            like_user = User.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        response_dict = {}
        roadmap_query = like_user.liked_roadmaps.filter(id=roadmap_id)
        if not roadmap_query.exists():
            # like
            like_user.liked_roadmaps.add(roadmap)
            roadmap.increment_like_count()
            response_dict["liked"] = True
            response_dict["roadmap_data"] = roadmap.to_dict_simple()
        else:
            # unlike
            like_user.liked_roadmaps.remove(roadmap)
            roadmap.decrement_like_count()
            response_dict["liked"] = False
            response_dict["like_count"] = roadmap.like_count

        roadmap.save()
        like_user.save()
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(["PUT"])


def roadmap_id_pin(request, roadmap_id):
    if request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
            pin_user = User.objects.get(id=request.user.id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        response_dict = {}
        roadmap_query = pin_user.pinned_roadmaps.filter(id=roadmap_id)
        if not roadmap_query.exists():
            # pin
            pin_user.pinned_roadmaps.add(roadmap)
            roadmap.increment_pin_count()
            response_dict["pinned"] = True
            response_dict["roadmap_data"] = roadmap.to_dict_simple()
        else:
            # unpin
            pin_user.pinned_roadmaps.remove(roadmap)
            roadmap.decrement_pin_count()
            response_dict["pinned"] = False
            response_dict["pin_count"] = roadmap.pin_count

        roadmap.save()
        pin_user.save()
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(["PUT"])


def roadmap_id_progress(request, roadmap_id):
    if request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        try:
            target_roadmap = Roadmap.objects.get(id=roadmap_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        # check if the user is the author
        if not target_roadmap.author_id == request.user.id:
            return HttpResponseForbidden()

        # parse request body
        try:
            req_data = json.loads(request.body.decode())
            new_progress_state = req_data["progress_state"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # check if the transition is valid & change progress state
        if new_progress_state == 1:
            if target_roadmap.progress == 3:
                target_roadmap.progress = 1
                target_roadmap.save()
                response_dict = {"progress_state": 1}
                return JsonResponse(response_dict)
            else:
                return HttpResponseBadRequest()
        elif new_progress_state == 3:
            if target_roadmap.progress == 2:
                target_roadmap.progress = 3
                target_roadmap.clear_section_progress()
                target_roadmap.save()

                response_dict = {"progress_state": 3}
                return JsonResponse(response_dict)
            else:
                return HttpResponseBadRequest()
        elif new_progress_state == 2:
            if target_roadmap.progress == 1:
                target_roadmap.progress = 2
                target_roadmap.save()

                response_dict = {"progress_state": 2}
                return JsonResponse(response_dict)
            else:
                return HttpResponseBadRequest()
        else:
            return HttpResponseBadRequest()

    return HttpResponseNotAllowed(["PUT"])