import json
from user.models import User

JSON_TYPE = "application/json"
USER_PATH = "/api/user/"
CSRF_TOKEN_PATH = USER_PATH + "token/"


def get_csrf(client):
    path = CSRF_TOKEN_PATH
    response = client.get(path)
    return response.cookies["csrftoken"].value


def signup_signin(client):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_user_json = json.dumps(dump_user)

    user = User.objects.create_user(
        username=dump_user["username"],
        email=dump_user["email"],
        password=dump_user["password"],
    )

    csrftoken = get_csrf(client)
    path = USER_PATH + "signin/"
    client.post(
        path,
        dump_user_json,
        content_type=JSON_TYPE,
        HTTP_X_CSRFTOKEN=csrftoken,
    )
    return user
