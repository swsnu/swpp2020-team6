import json
from json import JSONDecodeError
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
    JsonResponse,
)
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import Tag


@ensure_csrf_cookie
def tags(request, number):
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        top_tags = Tag.objects.order_by("-count_roadmap")[:number]
        tags_dict = {"tags": list(tag.tag_name for tag in top_tags)}
        return JsonResponse(tags_dict)
    return HttpResponseNotAllowed(["GET"])
