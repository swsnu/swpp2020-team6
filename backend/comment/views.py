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
from .models import Comment


def comment(request):
    if request.method == "POST":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            req_data = json.loads(request.body.decode())
            roadmap_id = req_data["roadmap_id"]
            content = req_data["content"]
            roadmap = Roadmap.objects.filter(id=roadmap_id).first()
        except (KeyError, JSONDecodeError, ObjectDoesNotExist):
            return HttpResponseBadRequest()

        author = request.user
        new_comment = Comment(content=content, author=author, roadmap=roadmap)
        new_comment.save()

        comment_dict = new_comment.to_dict()
        return JsonResponse(comment_dict, status=201)

    return HttpResponseNotAllowed(["POST"])
