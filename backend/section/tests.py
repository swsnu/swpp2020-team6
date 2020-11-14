import json
from django.test import TestCase
from .models import Section
from roadmap.models import Roadmap
from user.models import User


class SectionTestCase(TestCase):
    dump_user = {"username": "chris", "email": "chris@gmail.com", "password": "chris"}

    def test_section(self):
        user = User.objects.create_user(
            username=self.dump_user["username"],
            email=self.dump_user["email"],
            password=self.dump_user["password"],
        )
        roadmap = Roadmap(title="roadmap title", original_author=user, author=user)
        roadmap.save()
        section = Section.objects.create(title="section title", roadmap=roadmap)
        self.assertEqual(section.__str__(), section.title)
