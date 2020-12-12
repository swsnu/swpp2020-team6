import csv
from .models import Tag


def preprocess_tags():
    tags = [tag["tag_name"] for tag in Tag.objects.values()]

    with open("tags.csv", "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(tags)
