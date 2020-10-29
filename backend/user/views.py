from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.db.utils import IntegrityError

from json import JSONDecodeError
from .models import User
import json


# Create your views here.

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
@csrf_exempt
def user(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        try:
            User.objects.create_user(
                username=username, email=email, password=password)
            return HttpResponse(status=201)
        except IntegrityError:
            return HttpResponse(status=400)
    elif request.method == 'GET':
        if request.user.is_authenticated:
            response_user = {
                "is_signed_in": True
            }
        else:
            response_user = {
                "is_signed_in": False
            }
        return JsonResponse(response_user, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@ensure_csrf_cookie
@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
        except (KeyError, JSONDecodeError):
            return HttpResponseBadRequest()
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


def users(request):
    if request.method == 'GET':
        user_list = [user for user in User.objects.all().values('id', 'username', 'email')]
        return JsonResponse(user_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])
