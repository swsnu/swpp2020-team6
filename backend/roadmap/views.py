import json
from json import JSONDecodeError
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
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
from django.core import serializers
from utils.model_to_dict import to_dict
from datetime import datetime
from section.models import Section
from task.models import Task


def roadmap(request):
    return


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

        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        # Edit
        roadmap.delete_sections()
        roadmap.title = new_title
        roadmap.level = new_level
        for section in section_list:
            new_section = Section(title=section["title"], roadmap=roadmap).save()

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

        print(roadmap.section_roadmap)

        # Set default value or non-changing
        roadmap.date = datetime.now()
        roadmap.like_count = 0
        roadmap.comment_count = 0
        roadmap.pin_count = 0
        roadmap.progress = 1
        roadmap.author = request.user

        # roadmap.save()
        roadmap_dict = roadmap.to_dict()
        return JsonResponse(roadmap_dict)

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
        return HttpResponse(status=200)

    return HttpResponseNotAllowed(["GET", "PUT", "DELETE"])


def roadmap_id_progess(request):
    return
