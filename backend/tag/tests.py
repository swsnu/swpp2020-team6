from django.test import TestCase, Client
from utils.test_util import get_csrf, signup_signin
from .models import Tag


class TasktestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_tags = ["tag1", "tag2", "tag3", "tag4", "tag5"]
    json_type = "application/json"
    tag_path = "/api/tag/"

    def test_task(self):
        tag = Tag.objects.create(tag_name="tag")
        self.assertEqual(tag.__str__(), "tag-0")

    def test_tags(self):
        client = Client()
        csrftoken = get_csrf(client)
        number = 5
        path = self.tag_path + "{}/".format(number)

        # 405 (except for GET)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        signup_signin(client, self.dump_user)
        csrftoken = get_csrf(client)
        for i, tag in enumerate(self.dump_tags):
            Tag.objects.create(tag_name=tag, count_roadmap=i)

        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["tags"]), number)
