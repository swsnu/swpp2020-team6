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


def roadmap(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            new_title = req_data["title"]
            new_level = req_data["level"]
            section_list = req_data["sections"]
            tag_list = req_data["tags"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        new_roadmap = Roadmap(
            title=new_title,
            level=new_level,
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
            new_section = Section(title=section["title"], roadmap=new_roadmap)
            new_section.save()

            task_list = section["tasks"]
            for task in task_list:
                Task(
                    title=task["title"],
                    url=task["url"],
                    type=task["type"],
                    description=task["description"],
                    roadmap=new_roadmap,
                    section=new_section,
                ).save()

        # Post response
        roadmap_dict = new_roadmap.to_dict()
        return JsonResponse(roadmap_dict, status=201)

    return HttpResponseNotAllowed(["POST"])


def duplicate(request):
    return


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
            new_title = req_data["title"]
            new_level = req_data["level"]
            section_list = req_data["sections"]
            added_tag_list = req_data["addedTagList"]
            deleted_tag_list = req_data["deletedTagList"]

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # Edit
        roadmap.delete_sections()
        roadmap.title = new_title
        roadmap.level = new_level
        for section in section_list:
            new_section = Section(title=section["title"], roadmap=roadmap)
            new_section.save()

            task_list = section["tasks"]
            for task in task_list:
                Task(
                    title=task["title"],
                    url=task["url"],
                    type=task["type"],
                    description=task["description"],
                    roadmap=roadmap,
                    section=new_section,
                ).save()

        # Set default value or non-changing
        roadmap.date = datetime.now()
        roadmap.like_count = 0
        roadmap.comment_count = 0
        roadmap.pin_count = 0
        roadmap.progress = 1
        roadmap.author = request.user

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
        return HttpResponse(status=204)

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

    return HttpResponseNotAllowed(["GET", "PUT", "DELETE"])


def roadmap_id_progess(request):
    return
