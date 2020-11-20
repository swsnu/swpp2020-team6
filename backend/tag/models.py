from django.db import models


class Tag(models.Model):
    tag_name = models.CharField(max_length=64, default="")
    count_roadmap = models.IntegerField(default=0)

    def __str__(self):
        return self.tag_name

    def increment_count_roadmap(self):
        self.count_roadmap += 1

    def decrement_count_roadmap(self):
        self.count_roadmap -= 1
