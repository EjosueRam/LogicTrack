from django.urls import path, include
from .views import SalesView
from rest_framework import routers

roter = routers.DefaultRouter()
roter.register(r"sales", SalesView, "sales")
urlpatterns = [
    path("api/v1/", include(roter.urls)),
 ]