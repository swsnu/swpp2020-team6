import csv
from .models import Roadmap


def preprocess_tags():
    tag_sample = []
    processed_roadmaps = []

    with open("tags.csv", "w", newline="") as file:
        reader = csv.reader(file)
        for row in reader:
            tag_sample = row

    roadmaps = Roadmap.objects.select_related("id", "level", "tags").filter(
        private=False
    )

    for roadmap in roadmaps:
        level = [0] * 3
        level[roadmap.level - 1] = 1
        tags = [0] * len(tag_sample)
        tag_index = 0

        for tag_item in roadmap.tags:
            try:
                tag_index = tag_sample.index(tag_item)
            except (ValueError):
                continue
            tags[tag_index] = 1

        processed_roadmaps.append({"id": roadmap.id, "level": level, "tags": tags})
