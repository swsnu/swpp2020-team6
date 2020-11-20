from django.urls import path
from tag import views

urlpatterns = [path("<int:number>/", views.tags, name="tags")]
