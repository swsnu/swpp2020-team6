import json
from django.core.exceptions import ObjectDoesNotExist
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseBadRequest,
    HttpResponseForbidden,
    HttpResponseNotFound,
    JsonResponse,
)
from task.models import Task
from user.models import User
from roadmap.models import Roadmap

# Create your views here.
def task_id(request, task_id):
    if request.method == "PUT":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            target_task = Task.objects.get(id=task_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        # check if the user is the author
        if not target_task.roadmap.author.id == request.user.id:
            return HttpResponseForbidden()

        target_task.toggle_progress()
        response_dict = {"checked": target_task.checked}
        target_task.save()
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(["PUT"])
