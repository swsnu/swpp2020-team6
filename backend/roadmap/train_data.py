import csv
from .models import Roadmap


def preprocess_roadmaps():
    tag_sample = []
    processed_roadmaps = []

    with open("tags.csv", "r") as file:
        reader = csv.reader(file)
        for row in reader:
            tag_sample = row

    roadmaps = Roadmap.objects.prefetch_related("tags").filter(private=False)

    for roadmap in roadmaps:
        level = [0] * 3
        level[roadmap.level - 1] = 1
        tags = [0] * len(tag_sample)
        tag_index = 0

        for tag_item in roadmap.tags.all().values():
            try:
                tag_index = tag_sample.index(tag_item["tag_name"])
            except (ValueError):
                continue
            tags[tag_index] = 1

        processed_roadmaps.append({"id": roadmap.id, "level": level, "tags": tags})

    print(processed_roadmaps)
