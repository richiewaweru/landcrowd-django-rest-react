# notifications/serializers.py
from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    recipient_username = serializers.CharField(source='recipient.username', read_only=True)
    class Meta:
        model = Notification
        fields = ('id', 'sender', 'recipient', 'sender_username', 'recipient_username', 'message', 'title', 'notification_type', 'created_at', 'bid', 'parcel', 'land_listing', 'is_read')
