from django.urls import path, include
from .views import HuGeneratedView
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"hu-generated", HuGeneratedView, "hu-generated")


urlpatterns = [
    path("api/v1/", include(router.urls)),
]