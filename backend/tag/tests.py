from django.test import TestCase
from .models import Tag


class TasktestCase(TestCase):
    def test_task(self):
        tag = Tag.objects.create(tag_name="tag")
        self.assertEqual(tag.__str__(), "tag")
