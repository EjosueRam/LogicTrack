from django.urls import path
from .views import hu_internal_list


urlpatterns = [
    path('hu-internals/', hu_internal_list, name='hu-internal-list'),

]