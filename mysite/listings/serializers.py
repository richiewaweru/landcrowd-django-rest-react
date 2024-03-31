from rest_framework import serializers
from .models import LandListing, LandListingImages,LandListingMaps, Parcel,SellerProfile,SellerInquiry
from users.serializers import CustomUserSerializer
 


class SellerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = SellerProfile
        fields = '__all__'

class LandListingSerializer(serializers.ModelSerializer):
    seller = CustomUserSerializer(read_only=True)
    seller_profile = SellerSerializer(read_only=True)
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


        
class SellerInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerInquiry
        fields = ['id','title_deed_number','location','surveyor','full_name','phoneNumber','status']