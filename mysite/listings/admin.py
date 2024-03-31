from django.contrib import admin

# Register your models here.
from .models import LandListing, LandListingImages,Parcel,LandListingMaps,SellerProfile,SellerInquiry

admin.site.register(LandListing)
admin.site.register(LandListingImages)
admin.site.register(LandListingMaps)
admin.site.register(Parcel)
admin.site.register(SellerProfile)
admin.site.register(SellerInquiry)
