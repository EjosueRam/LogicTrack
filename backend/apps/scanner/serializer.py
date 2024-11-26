from rest_framework import serializers
from .models import ScanData

class ScannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanData
        fields = '__all__'