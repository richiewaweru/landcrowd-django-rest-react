from rest_framework import serializers
from .models import Bid
from users.models import CustomUser
from listings.serializers import ParcelSerializer ,LandListingSerializer
from users.serializers import CustomUserSerializer


class BidSerializer(serializers.ModelSerializer):
    bidder = CustomUserSerializer(read_only=True)
    listing = LandListingSerializer(read_only=True)
    parcel = ParcelSerializer(read_only=True)
   
    listing = LandListingSerializer(read_only=True)

    class Meta:
        model = Bid
        fields = '__all__'

    