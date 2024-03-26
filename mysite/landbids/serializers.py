from rest_framework import serializers
from .models import Bid,BuyerProfile
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

class BuyerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = BuyerProfile
        fields = '__all__'
