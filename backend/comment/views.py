import json
from json import JSONDecodeError

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
from django.core.exceptions import ObjectDoesNotExist
from .models import Comment


@ensure_csrf_cookie
def comment(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            roadmap_id = req_data["roadmap_id"]
            content = req_data["content"]
            roadmap = Roadmap.objects.get(id=roadmap_id)
        except (KeyError, JSONDecodeError, ObjectDoesNotExist):
            return HttpResponseBadRequest()

        author = request.user
        new_comment = Comment(content=content, author=author, roadmap=roadmap)
        new_comment.create_save()

        comment_dict = new_comment.to_dict()
        return JsonResponse(comment_dict, status=201)

    return HttpResponseNotAllowed(["POST"])


@ensure_csrf_cookie
def comment_id(request, comment_id):
    if request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            comment = Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if not comment.author_id == request.user.id:
            return HttpResponseForbidden()
        try:
            req_data = json.loads(request.body.decode())
            new_content = req_data["content"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()

        comment.content = new_content

        comment.edit_save()

        comment_dict = comment.to_dict()
        return JsonResponse(comment_dict, status=200)

    elif request.method == "DELETE":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            comment = Comment.objects.get(id=comment_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()
        if not comment.author_id == request.user.id:
            return HttpResponseForbidden()

        comment.delete()
        return HttpResponse(status=204)

    return HttpResponseNotAllowed(["PUT", "DELETE"])
