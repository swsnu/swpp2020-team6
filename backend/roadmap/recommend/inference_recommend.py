import pandas as pd


def top_n_cluster(cluster_data, user_roadmaps, n=3):
    """
    Find the clusters based on user's roadmap data
    :param cluster_data: clustering roadmap data
    :param roadmaps: user's picked roadmap index list
    :param n: the number of frequent clusters
    :return: top frequent n cluster index list
    """
    user_roadmap_id_df = pd.DataFrame(user_roadmaps, columns=["roadmap_id"])
    user_roadmap_df = pd.merge(
        user_roadmap_id_df, cluster_data, how="left", on="roadmap_id"
    )
    return user_roadmap_df["cluster_predicted"].value_counts()[:n].index.tolist()


def top_roadmaps(roadmaps, n_per_cluster=4):
    # TODO: #comment + #like + #pin으로
    #  return top popular n roadmaps per each cluster
    pass


def recommend_roadmaps(
    all_roadmaps, user_roadmaps, n_cluster=3, n_roadmap_per_cluster=4
):
    recommend_roadmaps_id = []
    cluster_data = pd.read_csv(
        "clustering_result.csv",
    )
    n_cluster_id = top_n_cluster(cluster_data, user_roadmaps, n=n_cluster)

    # 해당 클러스터들의 로드맵 df
    selected_cluster_roadmaps = cluster_data.loc[
        cluster_data["cluster_predicted"].isin(n_cluster_id)
    ]

    # all roadmaps와 교집합 구하고 + good_index column 합쳐줌
    selected_cluster_roadmaps = pd.merge(
        selected_cluster_roadmaps, all_roadmaps, how="left", on="roadmap_id"
    )

    # 거기서 good_index 높은 순서대로 n_roadmap 만큼 쌓

    return recommend_roadmaps_id


# TODO: roadmap models에 roadmap, id, cluster정보 같은 내용들로 바꿔주는 함수 만들어서,
#  이런데다가 param전달할 때 쓰기
# from roadmap.recommend.inference_recommend import top_n_cluster
top_n_cluster([1, 4, 5, 6, 7, 12], 3)
