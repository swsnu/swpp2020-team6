import json
from json import JSONDecodeError
from django.http import (
    HttpResponse,
    HttpResponseNotAllowed,
    HttpResponseNotFound,
    JsonResponse,
    HttpResponseBadRequest,
)
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError
from .models import User


# Create your views here.


@ensure_csrf_cookie
def token(request):
    if request.method == "GET":
        return HttpResponse(status=204)

    return HttpResponseNotAllowed(["GET"])


def user(request):
    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            email = req_data["email"]
            username = req_data["username"]
            password = req_data["password"]
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        try:
            User.objects.create_user(
                username=username, email=email, password=password)
            return HttpResponse(status=201)
        except IntegrityError:
            return HttpResponse(status=400)

    elif request.method == "GET":
        if request.user.is_authenticated:
            response_user = {"is_signed_in": True}
            response_user.update({"user_data": request.user.to_dict()})
        else:
            response_user = {"is_signed_in": False}
        return JsonResponse(response_user, status=200)
    else:
        return HttpResponseNotAllowed(["GET", "POST"])


def signin(request):
    if request.method == "POST":
        try:
            req_data = json.loads(request.body.decode())
            username = req_data["username"]
            password = req_data["password"]
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        signin_user = authenticate(
            request, username=username, password=password)
        if signin_user is not None:
            login(request, signin_user)
            response_user = signin_user.to_dict()
            return JsonResponse(response_user, status=201)

        return HttpResponse(status=401)

    return HttpResponseNotAllowed(["POST"])


def signout(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse(status=401)

    return HttpResponseNotAllowed(["GET"])


def users(request):
    if request.method == "GET":
        user_list = [
            user for user in User.objects.all().values("id", "username", "email")
        ]
        return JsonResponse(user_list, safe=False)

    return HttpResponseNotAllowed(["GET"])


def user_id(request, user_id):
    if request.method == "GET":
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        user_dict = user.to_dict_simple()
        return JsonResponse(user_dict, status=200)

    return HttpResponseNotAllowed(["GET"])
