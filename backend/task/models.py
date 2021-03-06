from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=64, default="")
    url = models.TextField(default="")
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

    def clear_progress(self):
        self.checked = False

    def toggle_progress(self):
        if self.checked:
            self.checked = False
        else:
            self.checked = True
