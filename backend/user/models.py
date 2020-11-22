from django.db import models
from django.contrib.auth.models import AbstractUser
from itertools import chain


class User(AbstractUser):
    user_picture_url = models.CharField(max_length=64, default="", blank=True)
    pinned_roadmaps = models.ManyToManyField(
        "roadmap.Roadmap", related_name="pinned_roadmaps_user", blank=True
    )
    liked_roadmaps = models.ManyToManyField(
        "roadmap.Roadmap", related_name="liked_roadmaps_user", blank=True
    )

    def __str__(self):
        return self.username

    def to_dict(self):
        """
        :return: User Object Dictionary (contain roadmap info)
        """
        options = self._meta
        data = {}
        for f in chain(options.concrete_fields):
            if f.name == "id":
                data["user_id"] = self.id
            elif f.name == "email":
                data["email"] = self.email
            elif f.name == "username":
                data["username"] = self.username
            elif f.name == "user_picture_url":
                data["user_picture_url"] = self.user_picture_url

        for f in chain(options.many_to_many):
            if f.name == "pinned_roadmaps" or f.name == "liked_roadmaps":
                data[f.name] = list(
                    roadmap.to_dict_simple() for roadmap in f.value_from_object(self)
                )

        # my roadmaps
        data["my_roadmaps"] = list(
            roadmap.to_dict_simple() for roadmap in self.author_roadmap.all()
        )

        # recommended_roadmaps

        return data

    def to_dict_simple(self):
        """
        :return: simple User Object Dictionary (contain public my_roadmap info)
        """
        options = self._meta
        data = {}
        for f in chain(options.concrete_fields):
            if f.name == "id":
                data["user_id"] = self.id
            elif f.name == "email":
                data["email"] = self.email
            elif f.name == "username":
                data["username"] = self.username
            elif f.name == "user_picture_url":
                data["user_picture_url"] = self.user_picture_url

        # public my_roadmaps
        data["my_roadmaps"] = list(
            roadmap.to_dict_simple()
            for roadmap in self.author_roadmap.filter(private=False)
        )

        return data
