from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=64, default="")
    url = models.TextField(blank=True)
    type = models.IntegerField(default=0)
    description = models.TextField(default="")
    checked = models.BooleanField(default=False)
    roadmap = models.ManyToManyField(
        "roadmap.Roadmap", related_name="task_roadmap", blank=True
    )
