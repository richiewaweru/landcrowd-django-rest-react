from django.db import models
from users.models import CustomUser
from landbids.models import Bid
from listings.models import Parcel,LandListing


# Create your models here.
class Notification(models.Model):
    # Types of notifications
    NOTIFICATION_TYPES = (
        ('new_bid', 'New Bid'),
        ('bid_deleted', 'Bid Deleted'),
        ('parcel_deleted', 'Parcel Deleted'),
        ('bid_approved', 'Bid Approved'),
        ('bid_rejected', 'Bid Rejected'),

    )

    sender = models.ForeignKey(CustomUser, related_name='sent_notifications', on_delete=models.CASCADE,null=True, blank=True)
    recipient = models.ForeignKey(CustomUser, related_name='notifications', on_delete=models.CASCADE)
    message = models.CharField(max_length=255)
    title = models.CharField(max_length=100,null=True,blank=True)
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    bid = models.ForeignKey(Bid, on_delete=models.SET_NULL, null=True, blank=True)
    parcel = models.ForeignKey(Parcel, on_delete=models.SET_NULL, null=True, blank=True)
    land_listing = models.ForeignKey(LandListing, on_delete=models.SET_NULL, null=True, blank=True)
    is_read = models.BooleanField(default=False,null=True, blank=True)
  
    def __str__(self):
        return f"Notification for {self.recipient.username}: {self.message}"


