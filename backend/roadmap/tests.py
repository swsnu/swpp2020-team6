import json
from django.test import TestCase, Client
from .models import User


class RoadmapTestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_user_json = json.dumps(dump_user)
    json_type = "application/json"
    user_path = "/api/user/"
    csrf_token_path = user_path + "token/"
    roadmap_path = "/api/roadmap/"

    def get_csrf(self, client):
        path = self.csrf_token_path
        response = client.get(path)
        return response.cookies["csrftoken"].value

    def signup_signin(self, client):
        User.objects.create_user(
            username=self.dump_user["username"],
            email=self.dump_user["email"],
            password=self.dump_user["password"],
        )

        csrftoken = self.get_csrf(client)
        path = self.user_path + "signin/"
        client.post(
            path,
            self.dump_user_json,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

    def test_roadmap(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = self.roadmap_path

        # 405 (except for POST)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        self.signup_signin(client)
        csrftoken = self.get_csrf(client)
        # 400
        response = client.post(
            path,
            json.dumps({}),
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 201 (create roadmap)
        dump_roadmap_input = {
            "title": "swpp",
            "level": 1,
            "sections": [
                {
                    "section_title": "design pattern",
                    "tasks": [
                        {
                            "task_title": "proxy",
                            "task_url": "www.proxy.com",
                            "task_type": 3,
                            "task_description": "proxy hoxy proxy",
                        },
                    ],
                },
            ],
            "tags": ["python", "CV"],
        }
        response = client.post(
            path,
            dump_roadmap_input,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        # 201 (create roadmap with exist tags)
        dump_roadmap_input = {
            "title": "swpp",
            "level": 1,
            "sections": [
                {
                    "section_title": "design pattern",
                    "tasks": [
                        {
                            "task_title": "proxy",
                            "task_url": "www.proxy.com",
                            "task_type": 3,
                            "task_description": "proxy hoxy proxy",
                        },
                    ],
                },
            ],
            "tags": ["python", "CV"],
        }
        response = client.post(
            path,
            dump_roadmap_input,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)
