from rest_framework import serializers
from .models import SurveyorProfile

class SurveyorSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = SurveyorProfile
        fields = '__all__'
