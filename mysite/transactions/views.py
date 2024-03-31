from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions ,status
from .models import Transaction
from .serializers import TransactionSerializer
from listings.models import LandListing
from landbids.models import Bid
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from notifications.models import Notification



class TransactionsListView(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Transaction.objects.all().order_by('-created_at')


        if hasattr(user, 'lawyer_profile'):
            queryset = queryset.filter(lawyer=user.lawyer_profile)
        elif hasattr(user, 'surveyor_profile'):
            queryset = queryset.filter(surveyor=user.surveyor_profile)

        return queryset


    def create(self, request):

        bid_ids = request.data.get('bid')

        if not bid_ids or not isinstance(bid_ids, list):
            raise ValidationError('A list of bid IDs is required.')
       
    
        transactions = []

        for bid_id in bid_ids:
            bid = get_object_or_404(Bid, pk=bid_id)  
            transaction = Transaction(listing=bid.listing, bid=bid)
            transaction.save()
            transactions.append(transaction)
      
        serializer = self.get_serializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    




    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_transactions(self, request):
        bid_ids = request.data.get('bid_ids', [])
        lawyer_id = request.data.get('lawyer', None)
        surveyor_id = request.data.get('surveyor', None)

        updated_transactions = []

        for bid_id in bid_ids:
            # Fetch the transaction associated with the bid_id
            bid = get_object_or_404(Bid, pk=bid_id)
            try:
                transaction = Transaction.objects.get(bid=bid)
                if lawyer_id:
                    transaction.lawyer_id = lawyer_id
                if surveyor_id:
                    transaction.surveyor_id = surveyor_id
                transaction.save()
                updated_transactions.append(transaction)
            except Transaction.DoesNotExist:
                continue
        
        serializer = TransactionSerializer(updated_transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def perform_update(self, serializer):
        print('in progress')
        user = self.request.user
        original_status = serializer.instance.status
        new_status = self.request.data.get('status')
        serializer.save()

        if new_status and new_status != original_status:
            recipient = None
            seller = serializer.instance.listing.seller
            if hasattr(user, 'lawyer_profile'):
                if serializer.instance.surveyor:
                    recipient = serializer.instance.bid.bidder
                    buyer_message = f"Lawyer {self.request.user.username} has updated your transaction status to {new_status} for land listing in {serializer.instance.listing.location} for parcel {serializer.instance.bid.parcel.parcel_label}.Visit your profile page to update complete the transaction process"
                    seller_message = f"Lawyer {self.request.user.username} has updated ransaction status to {new_status} for your land listing in {serializer.instance.listing.location} for parcel {serializer.instance.bid.parcel.parcel_label}.Keep touch with buyer to proceed accordingly"
            elif hasattr(user, 'surveyor_profile'):       
                if serializer.instance.lawyer:
                    recipient = serializer.instance.bid.bidder
                    buyer_message = f"Surveyor {self.request.user.username} has updated your transaction status to {new_status} for land listing in {serializer.instance.listing.location} for parcel {serializer.instance.bid.parcel.parcel_label}. Visit your profile to complete the transaction process."
                    seller_message = f"Lawyer {self.request.user.username} has updated transaction status to {new_status} for your land listing in {serializer.instance.listing.location} for parcel {serializer.instance.bid.parcel.parcel_label}. Keep touch with buyer to proceed accordingly. "
            if not recipient and serializer.instance.bid:
                recipient = serializer.instance.bid.bidder
        if buyer_message:
            Notification.objects.create(
                sender=user,
                recipient=recipient,
                message=buyer_message,
            )
        if seller_message:
            Notification.objects.create(
                sender=user,
                recipient=seller,
                message=seller_message,
            )
        
        
