from django.db import models
from section.models import Section
from tag.models import Tag


class Roadmap(models.Model):
    title = models.CharField(max_length=64, default="")
    date = models.DateField(blank=True)
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
