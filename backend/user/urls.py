from django.urls import path
from user import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('', views.user, name='user'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('users/', views.users, name='all_users'),
]
