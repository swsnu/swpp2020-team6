from django.db import models
from roadmap.models import Roadmap


class Task(models.Model):
    title = models.CharField(max_length=64)
    url = models.TextField()
    type = models.IntegerField()
    description = models.TextField()
    checked = models.BooleanField()
    roadmap = models.ManyToManyField(Roadmap, related_name="task_roadmap")
