from functools import reduce
from operator import or_, and_

import pandas as pd
from django.db.models import Q, F

from roadmap.models import Roadmap


def top_n_cluster(cluster_data, user_roadmaps, n=3):
    """
    Find the clusters based on user's roadmap data
    :param cluster_data: clustering roadmap data
    :param user_roadmaps: user's picked roadmap index list
    :param n: the number of frequent clusters
    :return: top frequent n cluster index list
    """
    user_roadmap_id_df = pd.DataFrame(user_roadmaps, columns=["roadmap_id"])
    user_roadmap_df = pd.merge(
        user_roadmap_id_df, cluster_data, how="left", on="roadmap_id"
    )
    return user_roadmap_df["cluster_predicted"].value_counts()[:n].index.tolist()


def recommend_roadmaps(user_roadmaps, n_cluster=3, n_roadmap=12):
    """
    Recommend roadmap 하는 전체 함수
    :param user_roadmaps: User의 roadmap id list
    :param n_cluster: 골라낼 클러스터 개수
    :param n_roadmap: 추천해줄 로드맵의 개수
    :return: 추천해줄 roadmap QuerySet
    """
    cluster_data = pd.read_csv(
        "clustering_result.csv",
    )
    print(cluster_data)
    n_cluster_id = top_n_cluster(cluster_data, user_roadmaps, n=n_cluster)
    print(n_cluster_id)
    # 골라진 cluster와 거기에 해당하는 roadmap mapping
    # row: roadmap
    # column1: cluster_predicted
    # column2: roadmap_id
    selected_cluster_roadmaps = cluster_data.loc[
        cluster_data["cluster_predicted"].isin(n_cluster_id)
    ]

    print(selected_cluster_roadmaps)
    cluster_filter = [
        reduce(or_, [Q(id__exact=id) for id in selected_cluster_roadmaps["roadmap_id"]])
    ]

    result_roadmaps = (
        Roadmap.objects.filter(reduce(and_, cluster_filter))
        .annotate(good_index=F("like_count") + F("pin_count") + F("comment_count"))
        .order_by("good_index")[:n_roadmap]
    )

    return result_roadmaps


def naive_recommend_roadmaps(n_roadmap=12):
    result_roadmaps = Roadmap.objects.annotate(
        good_index=F("like_count") + F("pin_count") + F("comment_count")
    ).order_by("good_index")[:n_roadmap]

    return result_roadmaps
