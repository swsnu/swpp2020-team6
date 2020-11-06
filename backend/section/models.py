from django.db import models
from task.models import Task


class Section(models.Model):
    title = models.CharField(max_length=64)
    tasks = models.ManyToManyField(Task, related_name="section")
