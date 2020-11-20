from django.db import models
from task.models import Task


class Section(models.Model):
    title = models.CharField(max_length=64, default="")
    roadmap = models.ForeignKey(
        "roadmap.Roadmap",
        on_delete=models.CASCADE,
        related_name="section_roadmap",
        null=True,
    )

    def __str__(self):
        return "{}".format(self.title)

    def clear_task_progress(self):
        for task in self.task_section.all():
            task.clear_progress()
            task.save()