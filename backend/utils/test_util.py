import json
from user.models import User
from roadmap.models import Roadmap

JSON_TYPE = "application/json"
USER_PATH = "/api/user/"
CSRF_TOKEN_PATH = USER_PATH + "token/"


def get_csrf(client):
    path = CSRF_TOKEN_PATH
    response = client.get(path)
    return response.cookies["csrftoken"].value


def signup_signin(client):

    user = User.objects.create_user(
        username="chris",
        email="chris@gmail.com",
        password="chris",
    )

    csrftoken = get_csrf(client)
    path = USER_PATH + "signin/"
    client.post(
        path,
        json.dumps({"username": "chris", "email": "chris@gmail.com", "password": "chris"}),
        content_type=JSON_TYPE,
        HTTP_X_CSRFTOKEN=csrftoken,
    )
    return user


def create_roadmap(title, user, level=1):
    return Roadmap.objects.create(
        title=title,
        level=level,
        original_author=user,
        author=user,
    )
