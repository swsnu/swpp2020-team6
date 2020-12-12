from django.urls import path
from user import views

urlpatterns = [
    path("token/", views.token, name="token"),
    path("", views.user, name="user"),
    path("signin/", views.signin, name="signin"),
    path("signout/", views.signout, name="signout"),
    path("users/", views.users, name="all_users"),
    path("<int:user_id>/", views.user_id, name="user_id"),
    path("recommend/", views.recommend, name="user_recommend"),
]
