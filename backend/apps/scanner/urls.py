from django.urls import path, include
from .views import ScanView
from rest_framework import routers
from .views_login import login_view
from .ViewsFile import upload_file
from .Views_hu import scan_hu

router = routers.DefaultRouter()
router.register(r"scanner", ScanView, "scanner")

urlpatterns = [
        path("api/v1/", include(router.urls)),
        path("login/", login_view, name="login"),
        path('api/upload/', upload_file, name='upload_file'),
        path('scan-hu/', scan_hu, name='scan_hu'),
        ]