from rest_framework import serializers
from .models import HuGenerated

class HuGeneratedSerializer(serializers.ModelSerializer):
    class Meta:
        model = HuGenerated
        fields = '__all__'