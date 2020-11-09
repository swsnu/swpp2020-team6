from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    user_picture_url = models.CharField(max_length=64, default="", blank=True)
    pinned_roadmaps = models.ManyToManyField(
        "roadmap.Roadmap", related_name="pinned_roadmap_user", blank=True
    )
    liked_roadmaps = models.ManyToManyField(
        "roadmap.Roadmap", related_name="liked_roadmap_user", blank=True
    )

    def __str__(self):
        return self.username
