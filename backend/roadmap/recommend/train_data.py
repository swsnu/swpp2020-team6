import csv
from roadmap.models import Roadmap
import pandas as pd
from kmodes.kmodes import KModes
from tag.make_tag_sample import preprocess_tags


def preprocess_roadmaps():
    tag_sample = []

    # create index row
    with open("tags.csv", "r") as file:
        reader = csv.reader(file)
        for row in reader:
            tag_sample = row

    # create following rows
    roadmaps = Roadmap.objects.prefetch_related("tags").filter(private=False)
    with open("kmodes_input.csv", "w", newline="") as file:
        writer = csv.writer(file)

        # write index row
        writer.writerow(["roadmap_id", "level"] + tag_sample)

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


def run_kmodes(n_clusters=4):
    km_huang = KModes(n_clusters=n_clusters, init="Huang", verbose=1, n_init=2, max_iter=10)
    csv_data = pd.read_csv("kmodes_input.csv")
    input_data = csv_data.iloc[:, 1:]
    roadmap_id = csv_data.iloc[:, 0]
    clusters = km_huang.fit_predict(input_data)

    cluster_df = pd.DataFrame(clusters)
    cluster_df.columns = ["cluster_predicted"]
    cluster_df["roadmap_id"] = roadmap_id

    # # cluster_data의 전체 행 개수를 roadmap id와 맞추어서 서치 없이 바로 접근할 수 있게하기위함
    # # 전체 roadmap 개수 + 0행만큼 행을 만든다
    # continuous_id_df = pd.DataFrame(list(range(roadmap_id[roadmap_id.index[-1]] + 1)))
    # continuous_id_df.columns = ["roadmap_id"]
    #
    # cluster_df = pd.merge(cluster_df, continuous_id_df, how="right", on="roadmap_id")
    print(cluster_df)
    # save as csv
    cluster_df.to_csv("clustering_result.csv", sep=",", na_rep="NaN", index=False)


def train_process(build_tag_sample, build_roadmap_data):
    # create tags.csv with currently existing tags
    if build_tag_sample:
        preprocess_tags()

    # create kmodes_input.csv based on currently existing roadmaps
    if build_roadmap_data:
        preprocess_roadmaps()

    run_kmodes()
