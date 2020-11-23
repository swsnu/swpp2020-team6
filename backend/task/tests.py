import json
from django.test import TestCase, Client
from .models import Task
from section.models import Section
from roadmap.models import Roadmap
from user.models import User


class TasktestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_user_json = json.dumps(dump_user)
    json_type = "application/json"
    task_path = "/api/task/"
    user_path = "/api/user/"
    roadmap_path = "/api/roadmap/"
    csrf_token_path = user_path + "token/"
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

    def test_task(self):
        user = User.objects.create_user(
            username=self.dump_user["username"],
            email=self.dump_user["email"],
            password=self.dump_user["password"],
        )
        roadmap = Roadmap(title="roadmap title", original_author=user, author=user)
        roadmap.save()
        section = Section.objects.create(title="section title", roadmap=roadmap)
        task = Task.objects.create(title="task title", roadmap=roadmap, section=section)
        # str
        self.assertEqual(task.__str__(), "task title")

        # clear
        task.clear_progress()
        task.save()
        self.assertFalse(task.checked)

        # toggle_progress
        task.toggle_progress()
        task.save()
        self.assertTrue(task.checked)

        task.toggle_progress()
        task.save()
        self.assertFalse(task.checked)

    def get_csrf(self, client):
        path = self.csrf_token_path
        response = client.get(path)
        return response.cookies["csrftoken"].value

    def test_task_id(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = self.task_path + "1/"

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

        # create a user and sign up, sign in
        user = User.objects.create_user(
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
        not_my_roadmap.save()
        not_my_section = Section.objects.create(
            title="section title", roadmap=not_my_roadmap
        )
        not_my_task = Task.objects.create(
            title="task title", roadmap=not_my_roadmap, section=not_my_section
        )

        others_path = self.task_path + str(not_my_task.id) + "/"
        csrftoken = self.get_csrf(client)

        # 403
        response = client.put(others_path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 403)

        # create my roadmap (progress 1)
        response = client.post(
            self.roadmap_path,
            self.dump_roadmap_input,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )

        new_roadmap_id = response.json()["id"]
        new_roadmap = Roadmap.objects.get(id=new_roadmap_id)
        target_task_id = new_roadmap.task_roadmap.all()[0].id

        path = self.task_path + str(target_task_id) + "/"
        csrftoken = self.get_csrf(client)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["checked"])

        csrftoken = self.get_csrf(client)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertFalse(response.json()["checked"])
