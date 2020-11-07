from django.db import models
from roadmap.models import Roadmap
from user.models import User


class Comment(models.Model):
    roadmap = models.ForeignKey(
        Roadmap, on_delete=models.CASCADE, related_name="roadmap_comment", blank=True
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="author_comment", blank=True
    )
    content = models.TextField(default="")
