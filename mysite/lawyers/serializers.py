from rest_framework import serializers
from .models import LawyerProfile

class LawyerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = LawyerProfile
        fields = '__all__'

