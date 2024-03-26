from rest_framework import generics, permissions,viewsets
from .models import Notification
from .serializers import NotificationSerializer
from django.db.models import Q

class NotificationListView(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return notifications for the currently authenticated user
        user = self.request.user
        return Notification.objects.filter(Q(recipient=user) | Q(sender=user)).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

