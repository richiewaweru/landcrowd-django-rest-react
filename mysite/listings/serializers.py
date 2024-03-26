# listings/serializers.py
from rest_framework import serializers
from .models import LandListing, LandListingImages,LandListingMaps, Parcel,SellerProfile
from users.serializers import CustomUserSerializer  

class LandListingSerializer(serializers.ModelSerializer):
    seller = CustomUserSerializer(read_only=True)
    class Meta:
        model = LandListing
        fields = '__all__'

class LandListingImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandListingImages
        fields = '__all__'

class LandListingMapsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandListingMaps
        fields = '__all__'


class ParcelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcel
        fields = '__all__'

class SellerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = SellerProfile
        fields = '__all__'
        