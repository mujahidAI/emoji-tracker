from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("add_mood/", views.add_mood, name="add_mood"), 
    path("edit/<int:id>/", views.edit_mood, name="edit_mood"),
    path("delete/<int:id>/", views.delete_mood, name="delete_mood"),


]
