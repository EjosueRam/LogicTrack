from rest_framework import serializers
from .models import SalesData

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesData
        fields = '__all__'