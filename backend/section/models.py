from django.db import models
from task.models import Task


class Section(models.Model):
    title = models.CharField(max_length=64, default="")
    tasks = models.ManyToManyField(Task, related_name="section", blank=True)

    def __str__(self):
        return "{}".format(self.title)
