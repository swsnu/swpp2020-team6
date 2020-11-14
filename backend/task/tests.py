import json
from django.test import TestCase
from .models import Task
from section.models import Section
from roadmap.models import Roadmap
from user.models import User


class TasktestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}

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
        self.assertEqual(task.__str__(), task.title)
