from rest_framework import serializers
from .models import HUInternal

class HUInternalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HUInternal
        fields = '__all__'