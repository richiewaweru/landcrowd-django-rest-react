from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Bid
from listings.models import LandListing ,Parcel
from .serializers import BidSerializer
from django.shortcuts import get_object_or_404
from .permissions import IsOwnerOrReadOnly
from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from notifications.models import Notification

class BidCreateView(generics.CreateAPIView):
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        with transaction.atomic():
            parcel_id = self.request.data.get('parcel')
            parcel = get_object_or_404(Parcel, pk=parcel_id)
            if parcel.status != 'available':
                raise ValidationError("This parcel is not available for bidding.")
            
            parcel.status = 'pending'
            parcel.save()
            
            listing_id = self.kwargs.get('listing_id')
            listing = get_object_or_404(LandListing, pk=listing_id)
         
            
            bid=serializer.save(bidder=self.request.user, listing=listing, parcel=parcel)
            Notification.objects.create(
            recipient=listing.seller,
            message=f"New bid on your parcel: {parcel.parcel_label} by {self.request.user.username}",
            notification_type='bid', 
        )



class BidHistoryView(generics.ListAPIView):
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        listing_id = self.kwargs.get('listing_id')
        return Bid.objects.filter(listing_id=listing_id).order_by('-created_at')

class UserBidsView(generics.ListAPIView):
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bid.objects.filter(bidder=self.request.user).select_related('listing').order_by('-created_at')


class BidDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Bid.objects.filter(bidder=self.request.user)
    
    def perform_update(self, serializer):
        bid=serializer.save()
        Notification.objects.create(
        recipient=bid.listing.seller,
        message=f"New bid on your listing in : {bid.listing.location} on parcel {bid.parcel.parcel_label} by {bid.bidder.username}",
        notification_type='new_bid',
        bid=bid
    )


    def perform_destroy(self, instance):
        Notification.objects.create(
        recipient=instance.listing.seller,
        message=f"Your bid on  {instance.listing.location} on parcel {instance.parcel.parcel_label} by {instance.bidder.username} has been deleted.",
        notification_type='bid_deleted',
        bid=instance
    )
        instance.delete()