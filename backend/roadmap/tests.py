import json
from django.test import TestCase, Client
from user.models import User
from .models import Roadmap


class RoadmapTestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_user_json = json.dumps(dump_user)
    json_type = "application/json"
    user_path = "/api/user/"
    csrf_token_path = user_path + "token/"
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
        response = client.post(
            path,
            self.dump_roadmap_input,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

        # 201 (create roadmap with exist tags)
        response = client.post(
            path,
            self.dump_roadmap_input,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 201)

    # TODO: check tasks, comments, tags keys

    def test_roadmap_id(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
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

        self.signup_signin(client)
        csrftoken = self.get_csrf(client)

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
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = Roadmap.objects.create(
            title="roadmap title",
            level=1,
            original_author=another_user,
            author=another_user,
        )
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
            content_type=self.json_type,
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
        csrftoken = self.get_csrf(client)
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

        self.signup_signin(client)
        csrftoken = self.get_csrf(client)

        # 404
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = Roadmap.objects.create(
            title="roadmap title",
            level=1,
            original_author=another_user,
            author=another_user,
        )

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
        csrftoken = self.get_csrf(client)
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

        self.signup_signin(client)
        csrftoken = self.get_csrf(client)

        # 404
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = Roadmap.objects.create(
            title="roadmap title",
            level=1,
            original_author=another_user,
            author=another_user,
        )

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

    def test_roadmap_id_progress(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = self.roadmap_path + "1/progress/"

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

        # sign up -> sign in
        author_user = User.objects.create_user(
            username=self.dump_user["username"],
            email=self.dump_user["email"],
            password=self.dump_user["password"],
        )

        csrftoken = self.get_csrf(client)
        signin_path = self.user_path + "signin/"
        client.post(
            signin_path,
            self.dump_user_json,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        csrftoken = self.get_csrf(client)

        # 404
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create another user, and her roadmap
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_roadmap = Roadmap.objects.create(
            title="roadmap title",
            level=1,
            original_author=another_user,
            author=another_user,
        )

        others_path = self.roadmap_path + str(not_my_roadmap.id) + "/progress/"

        # 403
        response = client.put(others_path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        # create my roadmap (progress 1)
        my_roadmap_level1 = Roadmap.objects.create(
            title="roadmap title",
            level=1,
            original_author=author_user,
            author=author_user,
        )

        response = client.put(
            self.roadmap_path + "{}/progress/".format(my_roadmap_level1.id),
            {"progress_state": 3},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        response = client.put(
            self.roadmap_path + "{}/progress/".format(my_roadmap_level1.id),
            {"progress_state": 2},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["progress_state"], 2)

        # create my roadmap (progress 2)
        dump_roadmap_progress2 = {
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
        response = client.post(
            self.roadmap_path,
            dump_roadmap_progress2,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        # change roadmap progress into 2 (in progress)
        # this has to be done manually after the creation process
        # since roadmaps are always created with progress 1 (before studying)
        roadmap_progress2_roadmap_id = response.json()["id"]
        roadmap_progress2_roadmap = Roadmap.objects.get(id=roadmap_progress2_roadmap_id)
        roadmap_progress2_roadmap.progress = 2
        roadmap_progress2_roadmap.save()

        # change the 'checked' task manually
        # since task's 'checked' attribute is always set to False on creation
        # Doing this to check if all tasks are cleared on progress state transition
        roadmap_progress2_task = roadmap_progress2_roadmap.task_roadmap.all()[0]
        roadmap_progress2_task.toggle_progress()
        roadmap_progress2_task.save()
        self.assertTrue(roadmap_progress2_task.checked)

        # 400
        # invalid state transition (2 -> 1)
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress2_roadmap_id)),
            {"progress_state": 1},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 200
        # progress state transition (2 -> 3)
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress2_roadmap_id)),
            {"progress_state": 3},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["progress_state"], 3)

        # every task's 'checked state should be cleared
        roadmap_progress2_roadmap = Roadmap.objects.get(id=roadmap_progress2_roadmap_id)
        for task in roadmap_progress2_roadmap.task_roadmap.all():
            self.assertFalse(task.checked)

        # create my roadmap (progress 3)
        dump_roadmap_progress3 = {
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
        response = client.post(
            self.roadmap_path,
            dump_roadmap_progress3,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        # change roadmap progress into 3 (in progress)
        # this has to be done manually after the creation process
        # since roadmaps are always created with progress 1 (before studying)
        roadmap_progress3_roadmap_id = response.json()["id"]
        roadmap_progress3_roadmap = Roadmap.objects.get(id=roadmap_progress3_roadmap_id)
        roadmap_progress3_roadmap.progress = 3
        roadmap_progress3_roadmap.save()

        # 400
        # invalid state transition (3 -> 2)
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress3_roadmap_id)),
            {"progress_state": 2},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 200
        # progress state transition (3 -> 1)
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress3_roadmap_id)),
            {"progress_state": 1},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["progress_state"], 1)

        # 400
        # progress state transition into an invalid state (any state except 1,2,3)
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress2_roadmap_id)),
            {"progress_state": 4},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 400
        # request body is invalid
        response = client.put(
            self.roadmap_path
            + "{}/progress/".format(str(roadmap_progress2_roadmap_id)),
            {"progress": 1},
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)