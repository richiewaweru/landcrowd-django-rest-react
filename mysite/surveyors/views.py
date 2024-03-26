from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from .models import SurveyorProfile
from .serializers import SurveyorSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class SurveyorProfileCreateList(generics.ListCreateAPIView):
    queryset = SurveyorProfile.objects.all()
    serializer_class = SurveyorSerializer
    permission_classes = [permissions.IsAuthenticated]  


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SurveyorListView(generics.ListAPIView):
    queryset = SurveyorProfile.objects.all()
    serializer_class = SurveyorSerializer