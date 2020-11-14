import json
from django.test import TestCase, Client
from user.models import User
from .models import Comment
from roadmap.models import Roadmap


class CommentTestCase(TestCase):
    json_type = "application/json"
    comment_path = "/api/comment/"
    user_path = "/api/user/"
    csrf_token_path = user_path + "token/"

    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}
    dump_user_json = json.dumps(dump_user)
    dump_comment_create = {"content": "it is great!", "roadmap_id": 1}
    dump_comment_edit = {"content": "new comment"}

    def get_csrf(self, client):
        path = self.csrf_token_path
        response = client.get(path)
        return response.cookies["csrftoken"].value

    def signup_signin(self, client):
        user = User.objects.create_user(
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
        return user

    def test_comment(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = self.comment_path

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

        user = self.signup_signin(client)
        csrftoken = self.get_csrf(client)
        # 400
        response = client.post(
            path,
            json.dumps({}),
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 201 (create roadmap and its comment)
        roadmap = Roadmap(title="roadmap title", original_author=user, author=user)
        roadmap.save()
        before_comment_count = roadmap.comment_count
        self.dump_comment_create["roadmap_id"] = roadmap.id
        response = client.post(
            path,
            self.dump_comment_create,
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        after_comment_count = Roadmap.objects.get(id=roadmap.id).comment_count
        self.assertEqual(after_comment_count - before_comment_count, 1)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(
            {
                "comment_id",
                "content",
                "author_id",
                "author_name",
                "author_user_picture_url",
                "roadmap_id",
            }
            <= set(response.json().keys())
        )

    def test_comment_id(self):
        client = Client(enforce_csrf_checks=True)
        csrftoken = self.get_csrf(client)
        path = self.comment_path + "1/"

        # 405 (except for PUT, DELETE)
        response = client.get(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        response = client.post(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

        # 401 (PUT, DELETE)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 401)

        user = self.signup_signin(client)
        csrftoken = self.get_csrf(client)

        # 404 (PUT, DELETE)
        response = client.put(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)
        response = client.delete(path, HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 404)

        # create roadmap and its comment
        roadmap = Roadmap(title="roadmap title", original_author=user, author=user)
        roadmap.save()
        self.dump_comment_create["roadmap_id"] = roadmap.id
        comment = Comment.objects.create(
            content="comment content", author=user, roadmap=roadmap
        )
        self.assertEqual(
            comment.__str__(),
            "{}-{}-{}".format(roadmap.id, user.username, "comment content"),
        )

        # create another user, and her comment
        another_user = User.objects.create_user(
            username="johndoe", email="johndoe@domain.com", password="johndoe"
        )
        not_my_comment = Comment.objects.create(
            content="comment content", author=another_user, roadmap=roadmap
        )
        self.assertEqual(
            not_my_comment.__str__(),
            "{}-{}-{}".format(roadmap.id, another_user.username, "comment content"),
        )

        # 403 (PUT, DELETE)
        response = client.put(
            self.comment_path + "{}/".format(not_my_comment.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 403)
        response = client.delete(
            self.comment_path + "{}/".format(not_my_comment.id),
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 403)

        # 400 (PUT)
        response = client.put(
            self.comment_path + "{}/".format(comment.id),
            json.dumps({}),
            content_type=self.json_type,
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 400)

        # 204 (PUT)
        response = client.put(
            self.comment_path + "{}/".format(comment.id),
            self.dump_comment_edit,
            content_type="application/json",
            HTTP_X_CSRFTOKEN=csrftoken,
        )
        self.assertEqual(response.status_code, 200)

        # 204 (DELETE)
        before_delete_comment_count = Roadmap.objects.get(id=roadmap.id).comment_count
        response = client.delete(
            self.comment_path + "{}/".format(comment.id), HTTP_X_CSRFTOKEN=csrftoken
        )
        after_delete_comment_count = Roadmap.objects.get(id=roadmap.id).comment_count
        self.assertEqual(after_delete_comment_count - before_delete_comment_count, -1)
        self.assertEqual(response.status_code, 204)
