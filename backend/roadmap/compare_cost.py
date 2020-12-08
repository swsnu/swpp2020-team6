from kmodes.kmodes import KModes
from tag.make_tag_sample import preprocess_tags
from roadmap.train_data import preprocess_roadmaps
import numpy as np

# Data visualize libs (for cost comparison)
import matplotlib.pyplot as plt


def compare_cost(build_tag_sample, build_roadmap_data):
    # create tags.csv with currently existing tags
    if build_tag_sample:
        preprocess_tags()

    # create kmodes_input.csv based on currently existing roadmaps
    if build_roadmap_data:
        preprocess_roadmaps()

    # input data
    csv_data = pd.read_csv("kmodes_input.csv")
    input_data = csv_data.iloc[:, 1:]

    # cao
    cost_cao = []
    for num_clusters in list(range(3, 7)):
        kmode_cao = KModes(n_clusters=num_clusters, init="Cao", verbose=1)
        kmode_cao.fit_predict(input_data)
        cost_cao.append(kmode_cao.cost_)

    y = np.array([i for i in range(3, 7, 1)])
    plt.plot(y, cost_cao)

    # Huang
    cost_huang = []
    for num_clusters in list(range(3, 7)):
        km_huang = KModes(n_clusters=num_clusters, init="Huang", verbose=1)
        km_huang.fit_predict(input_data)
        cost_huang.append(km_huang.cost_)

    plt.plot(y, cost_huang)
