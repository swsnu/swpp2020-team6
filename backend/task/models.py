from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=64, default="")
    url = models.TextField(blank=True)
    type = models.IntegerField(default=0)
    description = models.TextField(default="")
    checked = models.BooleanField(default=False)
    roadmap = models.ForeignKey(
        "roadmap.Roadmap",
        on_delete=models.CASCADE,
        related_name="task_roadmap",
        blank=True,
        null=True,
    )
    section = models.ForeignKey(
        "section.Section",
        on_delete=models.CASCADE,
        related_name="task_section",
        blank=True,
        null=True,
    )

    def __str__(self):
        return "{}".format(self.title)
