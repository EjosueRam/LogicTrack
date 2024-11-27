from rest_framework import viewsets
from .models import HuGenerated
from .Serializer import HuGeneratedSerializer

class HuGeneratedView(viewsets.ModelViewSet):
    queryset = HuGenerated.objects.all()
    serializer_class = HuGeneratedSerializer