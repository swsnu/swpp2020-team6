from django.db import models
from django.contrib.auth.models import AbstractUser
from roadmap.models import Roadmap


class User(AbstractUser):
    user_picture_url = models.CharField(max_length=64)
    pinned_roadmaps = models.ManyToMany(Roadmap, related_name="pinned_roadmap_user")
    my_roadmaps = models.ManyToMany(Roadmap, related_name="my_roadmap_user")
    liked_roadmaps = models.ManyToMany(Roadmap, related_name="liked_roadmap_user")

    def __str__(self):
        return self.username
