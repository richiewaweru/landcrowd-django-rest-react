from rest_framework import serializers
from .models import Transaction
from listings.serializers import ParcelSerializer ,LandListingSerializer
from users.serializers import CustomUserSerializer
from landbids.serializers import BidSerializer




class TransactionSerializer(serializers.ModelSerializer):

    buyer = CustomUserSerializer(read_only=True)
    listing = LandListingSerializer(read_only=True)
    bid = BidSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = '__all__'

