import json
from django.test import TestCase, Client
from utils.test_util import get_csrf, signup_signin, JSON_TYPE, create_roadmap
from user.models import User
from .models import Roadmap


class RoadmapTestCase(TestCase):
    roadmap_path = "/api/roadmap/"
    dump_roadmap_input = {
        "private": False,
        "title": "swpp",
        "level": 1,
        "description": "test-description",
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
    dump_roadmap_edit = {
        "private": True,
        "title": "swpp2",
        "level": 2,
        "description": "test-edit-description",
        "sections": [
            {
                "section_title": "design pattern2",
                "tasks": [
                    {
                        "task_title": "hoxy",
                        "task_url": "www.hoxy.com",
                        "task_type": 3,
                        "task_description": "proxy hoxy proxy",
                    },
                ],
            },
        ],
        "addedTagList": ["agile", "python"],
        "deletedTagList": ["python", "django"],
    }

    def test_roadmap(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = get_csrf(client)
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

        signup_signin(client)
        csrftoken = get_csrf(client)
        # 400
        response = client.post(
            path,
            json.dumps({}),
            content_type=JSON_TYPE,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 201 (create roadmap)
        response = client.post(
            path,
            self.dump_roadmap_input,
            content_type=JSON_TYPE,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        # 201 (create roadmap with exist tags)
        response = client.post(
            path,
            self.dump_roadmap_input,
            content_type=JSON_TYPE,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

    # TODO: check tasks, comments, tags keys

    def test_roadmap_id(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = get_csrf(client)
        path = self.roadmap_path + "1/"

        # 401 (GET, PUT, DELETE, POST)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        signup_signin(client)
        csrftoken = get_csrf(client)

        # 404
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create roadmap
        client.post(
            self.roadmap_path,
            self.dump_roadmap_input,
            content_type=JSON_TYPE,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = create_roadmap(title="roadmap title", user=another_user)
        self.assertEqual(not_my_roadmap.__str__(), "roadmap title")

        # 403 (PUT, DELETE)
        response = client.put(
            self.roadmap_path + "{}/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 403)
        response = client.delete(
            self.roadmap_path + "{}/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 403)

        # 400 (PUT)
        response = client.put(
            path,
            json.dumps({}),
            content_type=JSON_TYPE,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 200 (GET)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            {
                "id",
                "private",
                "title",
                "level",
                "description",
                "date",
                "like_count",
                "comment_count",
                "pin_count",
                "original_author_id",
                "original_author_name",
                "progress",
                "tags",
                "sections",
                "author_id",
                "author_name",
                "author_user_picture_url",
                "comments",
            }
            <= set(response.json().keys())
        )
        # TODO: check sections, tasks, comments, tags keys

        # 201 (POST)
        response = client.post(
            path,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        # 204 (PUT)
        response = client.put(
            path,
            self.dump_roadmap_edit,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

        # 204 (DELETE)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 204)

    def test_roadmap_id_like(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = get_csrf(client)
        path = self.roadmap_path + "1/like/"

        # 405 (except for PUT)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401 (PUT)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        signup_signin(client)
        csrftoken = get_csrf(client)

        # 404
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = create_roadmap(title="roadmap title", user=another_user)

        # 200 (Like the roadmap)
        response = client.put(
            self.roadmap_path + "{}/like/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["liked"])

        # 200 (Unlike the roadmap)
        response = client.put(
            self.roadmap_path + "{}/like/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.json()["liked"])

    def test_roadmap_id_pin(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = get_csrf(client)
        path = self.roadmap_path + "1/pin/"

        # 405 (except for PUT)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401 (PUT)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        signup_signin(client)
        csrftoken = get_csrf(client)

        # 404
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = create_roadmap(title="roadmap title", user=another_user)

        # 200 (Pin the roadmap)
        response = client.put(
            self.roadmap_path + "{}/pin/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["pinned"])

        # 200 (Unpin the roadmap)
        response = client.put(
            self.roadmap_path + "{}/pin/".format(not_my_roadmap.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.json()["pinned"])

    def test_simple_search(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = get_csrf(client)
        path = self.roadmap_path + "simple_search/"

        # 405 (except for GET)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401 (GET)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        user = signup_signin(client)
        csrftoken = get_csrf(client)
        # 400
        response = client.get(path, {}, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)

        # Add roadmaps
        roadmap1 = create_roadmap(title="roadmap with title", user=user)
        roadmap2 = create_roadmap(title="title roadmap", user=user)

        # 200 (GET)
        print(path)
        response = client.get(
            path,
            {"title": "roadmap title"},
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["roadmaps"]), 2)
