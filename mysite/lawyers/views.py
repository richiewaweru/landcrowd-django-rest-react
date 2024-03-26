from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from .models import LawyerProfile
from .serializers import LawyerSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class LawyerProfileCreateList(generics.ListCreateAPIView):
    queryset = LawyerProfile.objects.all()
    serializer_class = LawyerSerializer
    permission_classes = [permissions.IsAuthenticated]  


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class LawyerListView(generics.ListAPIView):
    queryset = LawyerProfile.objects.all()
    serializer_class = LawyerSerializer
