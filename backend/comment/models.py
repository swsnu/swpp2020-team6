from django.db import models
from roadmap.models import Roadmap
from user.models import User
from itertools import chain


class Comment(models.Model):
    roadmap = models.ForeignKey(
        Roadmap, on_delete=models.CASCADE, related_name="roadmap_comment", blank=True
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="author_comment", blank=True
    )
    content = models.TextField(default="")

    def __str__(self):
        return "{}-{}-{}".format(self.roadmap_id, self.author.username, self.content)

    def to_dict(self):
        """
        Gather roadmap and author infos about the comment
        :return: comment dictionary object
        """
        options = self._meta
        data = {}
        for f in chain(options.concrete_fields):
            if f.name == "content":
                data[f.name] = f.value_from_object(self)
            elif f.name == "author":
                author = User.objects.get(id=f.value_from_object(self))
                data["author_id"] = author.id
                data["author_name"] = author.username
                data["author_user_picture_url"] = author.user_picture_url
            elif f.name == "roadmap":
                data["roadmap_id"] = f.value_from_object(self)

        return data
