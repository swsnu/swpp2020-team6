from django.db import models
from section.models import Section
from tag.models import Tag


class Roadmap(models.Model):
    title = models.CharField(max_length=64, default="")
    date = models.DateField()
    level = models.IntegerField()
    like_count = models.IntegerField()
    comment_count = models.IntegerField()
    pin_count = models.IntegerField()
    original_author = models.ForeignKey(
        "user.User",
        on_delete=models.CASCADE,
        related_name="originial_author_roadmap",
    )
    author = models.ForeignKey(
        "user.User", on_delete=models.CASCADE, related_name="author_roadmap"
    )
    sections = models.ManyToManyField(Section, related_name="section_roadmap")
    tags = models.ManyToManyField(Tag, related_name="tags_roadmap")
