from django.db import models
from section.models import Section
from tag.models import Tag
from itertools import chain
from user.models import User


class Roadmap(models.Model):
    title = models.CharField(max_length=64, default="")
    date = models.DateTimeField(blank=True)
    level = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    pin_count = models.IntegerField(default=0)
    original_author = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        related_name="originial_author_roadmap",
        blank=True,
    )
    author = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, related_name="author_roadmap", blank=True
    )
    sections = models.ManyToManyField(
        Section, related_name="section_roadmap", blank=True
    )
    tags = models.ManyToManyField(Tag, related_name="tags_roadmap", blank=True)

    def __str__(self):
        return "{}".format(self.title)

    def to_roadmap_object(self):
        """
        :return: Roadmap Object Dictionary (contain author/tags/sections/tasks/comments info)
        """
        options = self._meta
        data = {}
        for f in chain(options.concrete_fields):
            if f.name == "date":
                data[f.name] = f.value_from_object(self).strftime("%Y-%m-%d %H:%M:%S")
            elif f.name == "author":
                author = User.objects.get(id=f.value_from_object(self))
                data["author_id"] = author.id
                data["author_name"] = author.username
                data["author_user_picture_url"] = author.user_picture_url
            elif f.name == "original_author":
                original_author = User.objects.get(id=f.value_from_object(self))
                data["original_author"] = original_author.id
                data["original_author_name"] = original_author.username
            else:
                data[f.name] = f.value_from_object(self)

        for f in chain(options.many_to_many):
            if f.name == "tags":
                data[f.name] = list(
                    {"tag_id": tag.id, "tag_name": tag.tag_name}
                    for tag in f.value_from_object(self)
                )
            elif f.name == "sections":
                data[f.name] = list(
                    {
                        "section_title": section.title,
                        "tasks": list(
                            {
                                "task_title": task.title,
                                "task_type": task.type,
                                "task_url": task.url,
                                "task_description": task.description,
                                "task_checked": task.checked,
                            }
                            for task in section.tasks.all()
                        ),
                    }
                    for section in f.value_from_object(self)
                )

        data["comments"] = list(
            {
                "roadmap_id": comment.roadmap_id,
                "content": comment.content,
                "author_id": comment.author_id,
                "author_name": comment.author.username,
                "author_picture_url": comment.author.user_picture_url,
            }
            for comment in self.roadmap_comment.all()
        )
        return data
