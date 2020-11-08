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

        roadmap_dict = model_to_dict(roadmap)
        return JsonResponse(roadmap_dict)

    elif request.method == "PUT":
        return

    elif request.method == "DELETE":
        return

    return HttpResponseNotAllowed(["GET", "PUT", "DELETE"])


def roadmap_id_progess(request):
    return
