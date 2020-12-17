import json
from json import JSONDecodeError
from operator import and_, or_
from functools import reduce

from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Roadmap
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
    JsonResponse,
)
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from section.models import Section
from task.models import Task
from tag.models import Tag
from user.models import User


@ensure_csrf_cookie
def roadmap(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            new_private = req_data["private"]
            new_image_id = req_data["imageId"]
            new_title = req_data["title"]
            new_level = req_data["level"]
            new_description = req_data["description"]
            section_list = req_data["sections"]
            tag_list = req_data["tags"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        new_roadmap = Roadmap(
            private=new_private,
            image_id=new_image_id,
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
                target_tag = tag_query.first()
                new_roadmap.tags.add(target_tag)
                target_tag.increment_count_roadmap()
                target_tag.save()

            else:
                new_tag = Tag(tag_name=tag)
                new_tag.increment_count_roadmap()
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


@ensure_csrf_cookie
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
            new_image_id = req_data["imageId"]
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
        roadmap.image_id = new_image_id
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
                target_tag = tag_query.first()
                target_tag.decrement_count_roadmap()
                target_tag.save()
                roadmap.tags.remove(target_tag)

        # Add new tags m2m field in roadmap
        for tag in added_tag_list:
            tag_query = Tag.objects.filter(tag_name__iexact=tag)
            if tag_query.exists():
                target_tag = tag_query.first()
                roadmap.tags.add(target_tag)
                target_tag.increment_count_roadmap()
                target_tag.save()
            else:
                new_tag = Tag(tag_name=tag)
                new_tag.increment_count_roadmap()
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

        for tag in roadmap.tags.all():
            tag.decrement_count_roadmap()
            tag.save()

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
            image_id=roadmap.image_id,
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
            tag.increment_count_roadmap()
            tag.save()
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


@ensure_csrf_cookie
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


@ensure_csrf_cookie
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


@ensure_csrf_cookie
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
        return progress_change(roadmap_id, new_progress_state)

    return HttpResponseNotAllowed(["PUT"])


def progress_change(roadmap_id, new_progress_state):
    try:
        target_roadmap = Roadmap.objects.get(id=roadmap_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if new_progress_state == 1:
        if target_roadmap.progress == 3 or target_roadmap.progress == 2:
            # progress clear(3->1) or quit(2->1)
            target_roadmap.progress = 1
            target_roadmap.save()
            response_dict = {
                "progress_state": 1,
                "sections": list(
                    {
                        "section_id": section.id,
                        "section_title": section.title,
                        "tasks": list(
                            {
                                "task_id": task.id,
                                "task_title": task.title,
                                "task_type": task.type,
                                "task_url": task.url,
                                "task_description": task.description,
                                "task_checked": task.checked,
                            }
                            for task in section.task_section.all()
                        ),
                    }
                    for section in target_roadmap.section_roadmap.all()
                ),
            }
            return JsonResponse(response_dict)
        else:
            return HttpResponseBadRequest()
    elif new_progress_state == 3:
        if target_roadmap.progress == 2:  # progress finish
            target_roadmap.progress = 3
            target_roadmap.save()

            response_dict = {
                "progress_state": 3,
                "sections": list(
                    {
                        "section_id": section.id,
                        "section_title": section.title,
                        "tasks": list(
                            {
                                "task_id": task.id,
                                "task_title": task.title,
                                "task_type": task.type,
                                "task_url": task.url,
                                "task_description": task.description,
                                "task_checked": task.checked,
                            }
                            for task in section.task_section.all()
                        ),
                    }
                    for section in target_roadmap.section_roadmap.all()
                ),
            }
            return JsonResponse(response_dict)
        else:
            return HttpResponseBadRequest()
    elif new_progress_state == 2:
        if target_roadmap.progress == 1:  # progress start
            target_roadmap.progress = 2
            target_roadmap.clear_section_progress()
            target_roadmap.save()

            response_dict = {
                "progress_state": 2,
                "sections": list(
                    {
                        "section_id": section.id,
                        "section_title": section.title,
                        "tasks": list(
                            {
                                "task_id": task.id,
                                "task_title": task.title,
                                "task_type": task.type,
                                "task_url": task.url,
                                "task_description": task.description,
                                "task_checked": task.checked,
                            }
                            for task in section.task_section.all()
                        ),
                    }
                    for section in target_roadmap.section_roadmap.all()
                ),
            }
            return JsonResponse(response_dict)
        else:
            return HttpResponseBadRequest()
    else:
        return HttpResponseBadRequest()


@ensure_csrf_cookie
def best(request, top_n):
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        sorted_roadmaps = Roadmap.objects.filter(private=False).order_by(
            "-like_count", "-pin_count"
        )
        total_roadmaps_count = sorted_roadmaps.count()
        return_roadmaps_count = (
            top_n if top_n < total_roadmaps_count else total_roadmaps_count
        )
        best_roadmaps = list(
            roadmap.to_dict_simple()
            for roadmap in sorted_roadmaps[:return_roadmaps_count]
        )
        return JsonResponse({"roadmaps": best_roadmaps})

    return HttpResponseNotAllowed(["GET"])


@ensure_csrf_cookie
def new(request, top_n):
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        sorted_roadmaps = Roadmap.objects.filter(private=False).order_by("-date")
        total_roadmaps_count = sorted_roadmaps.count()
        return_roadmaps_count = (
            top_n if top_n < total_roadmaps_count else total_roadmaps_count
        )
        new_roadmaps = list(
            roadmap.to_dict_simple()
            for roadmap in sorted_roadmaps[:return_roadmaps_count]
        )
        return JsonResponse({"roadmaps": new_roadmaps})

    return HttpResponseNotAllowed(["GET"])


@ensure_csrf_cookie
def search(request):
    """
    roadmap search with title, tag, level, sort options
    :param request: with GET parameter
    :return: search result n(#roadmaps per page) simple roadmaps
    """
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            # Parse GET parameters
            title_keywords = request.GET.get("title", "").split()
            tags = request.GET.getlist("tags", [])
            levels = list(
                int(level) for level in request.GET.getlist("levels", ["1", "2", "3"])
            )
            sort = request.GET.get("sort", "1")
            page_index = int(request.GET.get("page", 1))
            roadmap_per_page = int(request.GET.get("perpage", 9))

            # Convert sort number into order_by field
            if sort == "1":
                sort = "-like_count"
            elif sort == "2":
                sort = "-pin_count"
            elif sort == "3":
                sort = "-date"
            else:
                sort = "-like_count"
        except (KeyError, JSONDecodeError, AttributeError, ValueError):
            return HttpResponseBadRequest()

        # Accumulate each filter
        filters = [Q(private__exact=False)]
        if title_keywords:
            filters.append(
                reduce(
                    and_, [Q(title__icontains=keyword) for keyword in title_keywords]
                )
            )
        if tags:
            filters.append(
                reduce(or_, [Q(tags__tag_name__icontains=tag) for tag in tags])
            )
        filters.append(reduce(or_, [Q(level__exact=level) for level in levels]))

        # Lookup roadmap db with filters
        result = Roadmap.objects.filter(reduce(and_, filters)).distinct().order_by(sort)

        # Select #roadmap_per_page of given page
        partial_result = result[
            (page_index - 1) * roadmap_per_page : page_index * roadmap_per_page
        ]
        result_dict = {
            "page": page_index,
            "total_count": result.count(),
            "roadmaps": list(r.to_dict_simple() for r in partial_result),
        }
        return JsonResponse(result_dict)
    return HttpResponseNotAllowed(["GET"])
