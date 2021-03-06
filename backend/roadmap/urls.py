from django.urls import path
from roadmap import views

urlpatterns = [
    path("", views.roadmap, name="roadmap"),
    path("<int:roadmap_id>/", views.roadmap_id, name="roadmap_id"),
    path("<int:roadmap_id>/like/", views.roadmap_id_like, name="roadmap_id_like"),
    path("<int:roadmap_id>/pin/", views.roadmap_id_pin, name="roadmap_id_pin"),
    path(
        "<int:roadmap_id>/progress/",
        views.roadmap_id_progress,
        name="roadmap_id_progress",
    ),
    path("best/<int:top_n>/", views.best, name="roadmap_best"),
    path("new/<int:top_n>/", views.new, name="roadmap_new"),
    path("search/", views.search, name="roadmap_search"),
]
