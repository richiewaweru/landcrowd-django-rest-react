from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Bid,BuyerProfile
from listings.models import LandListing ,Parcel
from .serializers import BidSerializer,BuyerSerializer
from django.shortcuts import get_object_or_404
from .permissions import IsOwnerOrReadOnly
from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from notifications.models import Notification
from django.contrib.auth import get_user_model
from transactions.models import Transaction



class BidCreateView(generics.CreateAPIView):
    serializer_class = BidSerializer
    permission_classes = [permissions.IsAuthenticated,IsOwnerOrReadOnly]
    def perform_create(self, serializer):
        with transaction.atomic():
            listing_id = self.kwargs.get('listing_id')
            parcel_id = self.request.data.get('parcel')

            # Locks the parcel row for update to avoid race conditions
            parcel = get_object_or_404(Parcel.objects.select_for_update(), pk=parcel_id)
            if parcel.status != 'available':
                raise ValidationError("This parcel is not available for bidding.")
            
             # Update the parcel status
            Parcel.objects.filter(pk=parcel_id).update(status='pending')
           
            
            listing = get_object_or_404(LandListing, pk=listing_id)

            buyer=get_object_or_404(BuyerProfile,user=self.request.user)
         
            
            bid=serializer.save(bidder=self.request.user, listing=listing, parcel=parcel,buyer_profile=buyer)
            Notification.objects.create(
            sender=self.request.user,
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
        transaction = get_object_or_404(Transaction, bid=serializer.instance)
        bid=serializer.save()
        parcel = bid.parcel
        if transaction.status in ['pending', 'in_progress']:
            raise ValidationError("This parcel transaction is still being handled.")
        parcel.status = 'sold'
        parcel.save()
        Notification.objects.create(
        sender=self.request.user,  # sender is the bidder
        recipient=bid.listing.seller,
        message=f"New sale on your listing in : {bid.listing.location} on parcel {bid.parcel.parcel_label} by {bid.bidder.username}.Contant {bid.bidder.username} from {bid.bidder.buyer_profile.phoneNumber} or  email {bid.bidder.email} to keep in touch",
        notification_type='new_bid',
        bid=bid
    )


    def perform_destroy(self, instance):
        parcel = instance.parcel
        if parcel.status == 'sold':
            raise ValidationError("This parcel has already been sold.")
        parcel.status = 'available'
        parcel.save()
        Notification.objects.create(
        sender=self.request.user,  # sender is the bidder
        recipient=instance.listing.seller,
        message=f"The bid on your listing in : {instance.listing.location} on parcel {instance.parcel.parcel_label} by {instance.bidder.username} has been withdrawn.Contant {instance.bidder.username} from {instance.bidder.buyer_profile.phoneNumber} or email {instance.bidder.email} to keep in touch",
        notification_type='bid_deleted',
        bid=instance
    )
        instance.delete()


User = get_user_model()

class BuyerProfileCreateList(generics.CreateAPIView):
    queryset = BuyerProfile.objects.all()
    serializer_class = BuyerSerializer
    permission_classes = [permissions.IsAuthenticated]  


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)