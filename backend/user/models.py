from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    # user_picture_url = 0

    # TODO: add other members
    # pinned_roadmaps
    # my_roadmaps
    # liked_roadmaps

    def __str__(self):
        return self.username
