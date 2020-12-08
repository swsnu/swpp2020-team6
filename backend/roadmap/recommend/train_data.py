import csv
from roadmap.models import Roadmap
import pandas as pd
from kmodes.kmodes import KModes
from tag.make_tag_sample import preprocess_tags


def preprocess_roadmaps():
    tag_sample = []
    processed_roadmaps = []

    # create index row
    with open("tags.csv", "r") as file:
        reader = csv.reader(file)
        for row in reader:
            tag_sample = row

    tag_sample[:0] = ["roadmap_id", "level"]

    # create following rows
    roadmaps = Roadmap.objects.prefetch_related("tags").filter(private=False)
    with open("kmodes_input.csv", "w", newline="") as file:
        writer = csv.writer(file)

        # write index row
        writer.writerow(tag_sample)

        for roadmap in roadmaps:
            tags = [0] * len(tag_sample)
            tag_index = 0

            for tag_item in roadmap.tags.all().values():
                try:
                    tag_index = tag_sample.index(tag_item["tag_name"])
                except (ValueError):
                    continue
                tags[tag_index] = 1

            writer.writerow([roadmap.id, roadmap.level] + tags)

    return processed_roadmaps


def run_kmodes():
    km_huang = KModes(n_clusters=10, init="Huang", verbose=1)
    csv_data = pd.read_csv("kmodes_input.csv")
    input_data = csv_data.iloc[:, 1:]
    roadmap_id = csv_data.iloc[:, 0]
    clusters = km_huang.fit_predict(input_data)

    cluster_df = pd.DataFrame(clusters)
    cluster_df.columns = ["cluster_predicted"]
    cluster_df["roadmap_id"] = roadmap_id

    # save as csv
    cluster_df.to_csv("clustering_result.csv", sep=",", na_reap="NaN", index=False)


def train_process(build_tag_sample, build_roadmap_data):
    # create tags.csv with currently existing tags
    if build_tag_sample:
        preprocess_tags()

    # create kmodes_input.csv based on currently existing roadmaps
    if build_roadmap_data:
        preprocess_roadmaps()

    run_kmodes()
