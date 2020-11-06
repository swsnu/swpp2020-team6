from django.db import models
from roadmap.models import Roadmap
from user.models import User


class Comment(models.Model):
    roadmap = models.ForeignKey(
        Roadmap, on_delete=models.CASCADE, related_name="roadmap_comment"
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="author_comment"
    )
    content = models.TextField()
