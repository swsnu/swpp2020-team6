from django.db import models
from section.models import Section
from tag.models import Tag
from itertools import chain
from user.models import User


class Roadmap(models.Model):
    title = models.CharField(max_length=64, default="")
    date = models.DateTimeField(auto_now_add=True)
    level = models.IntegerField(default=0)
    like_count = models.IntegerField(default=0)
    comment_count = models.IntegerField(default=0)
    pin_count = models.IntegerField(default=0)
    progress = models.IntegerField(default=1)
    original_author = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        related_name="originial_author_roadmap",
        blank=True,
    )
    author = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, related_name="author_roadmap", blank=True
    )
    tags = models.ManyToManyField(Tag, related_name="tags_roadmap", blank=True)

    def __str__(self):
        return "{}".format(self.title)

    def to_dict(self):
        """
        Gather all infos about roadmap and return dictionary object
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
                data["original_author_id"] = original_author.id
                data["original_author_name"] = original_author.username
            else:
                data[f.name] = f.value_from_object(self)

        for f in chain(options.many_to_many):
            if f.name == "tags":
                data[f.name] = list(
                    {"tag_id": tag.id, "tag_name": tag.tag_name}
                    for tag in f.value_from_object(self)
                )

        data["sections"] = list(
            {
                "section_id": section.id,
                "section_title": section.title,
                "tasks": list(
                    {
                        "task_id": task.id,
                        "task_title": task.title,
                        "task_type": task.type,
                        "task_url": task.url,
                        "task_description": task.description,
                        "task_checked": task.checked,
                    }
                    for task in section.task_section.all()
                ),
            }
            for section in self.section_roadmap.all()
        )

        data["comments"] = list(
            {
                "comment_id": comment.id,
                "roadmap_id": comment.roadmap_id,
                "content": comment.content,
                "author_id": comment.author_id,
                "author_name": comment.author.username,
                "author_picture_url": comment.author.user_picture_url,
            }
            for comment in self.roadmap_comment.all()
        )
        return data

    def to_dict_simple(self):
        """
        Gather simple infos about roadmap and return dictionary object
         :return:
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
            else:
                data[f.name] = f.value_from_object(self)

        for f in chain(options.many_to_many):
            if f.name == "tags":
                data[f.name] = list(
                    {"tag_id": tag.id, "tag_name": tag.tag_name}
                    for tag in f.value_from_object(self)
                )

        return data

    def delete_sections(self):
        for section in self.section_roadmap.all():
            section.delete()
