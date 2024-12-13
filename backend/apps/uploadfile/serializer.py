from rest_framework import serializers
import logging
from .models import HUInternal

logger = logging.getLogger(__name__)

class HUInternalSerializer(serializers.ModelSerializer):
    class Meta:
        model = HUInternal
        fields = '__all__'

    def validate(self, attrs):
        logger.debug(f"Validating data: {attrs}")
        return super().validate(attrs)

    def create(self, validated_data):
        logger.info(f"Creating HUInternal with: {validated_data}")
        instance = super().create(validated_data)
        logger.info(f"Created HUInternal with ID: {instance.id}")
        return instance