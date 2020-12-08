"""
    Roadmap clustering할 때 사용
    Usage:
        python manage.py shell
        >>> import roadmap.recommend.main
"""
from .train_data import *

build_tag_sample = False
build_roadmap_data = False
print("Training Start...")
print(
    "Training options: build_tag_sampe:{} build_roadmap_data:{}".format(
        build_tag_sample, build_roadmap_data
    )
)
train_process(build_tag_sample, build_roadmap_data)
