from rest_framework import viewsets
from .models import SalesData
from .serializer import SalesSerializer

class SalesView(viewsets.ModelViewSet):
    queryset = SalesData.objects.all()
    serializer_class = SalesSerializer
