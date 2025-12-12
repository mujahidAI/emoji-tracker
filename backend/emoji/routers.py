from django.urls import path, include
from rest_framework.routers import DefaultRouter
from emoji.views import MoodViewSet
router = DefaultRouter()
router.register(r"mood", MoodViewSet, basename="mood")

urlpatterns = [
    path("", include(router.urls)),
]