from rest_framework import viewsets
from .models import ScanData
from .serializer import ScannerSerializer

class ScanView(viewsets.ModelViewSet):
    queryset = ScanData.objects.all()
    serializer_class = ScannerSerializer
