from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=64, default="")
    url = models.TextField()
    type = models.IntegerField()
    description = models.TextField()
    checked = models.BooleanField()
    roadmap = models.ManyToManyField("roadmap.Roadmap", related_name="task_roadmap")
