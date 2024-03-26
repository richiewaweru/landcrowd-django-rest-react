from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from listings.models import LandListing  ,Parcel ,  LandListingMaps ,LandListingImages
from users.models import CustomUser 
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
from users.models import CustomUser

class Bid(models.Model):
    
    bidder = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bids',null=True)
    listing = models.ForeignKey(LandListing, on_delete=models.CASCADE, related_name='bids_on_listing',null=True)
    parcel = models.ForeignKey(Parcel, on_delete=models.CASCADE, related_name='bids_on_parcel',null=True)
    created_at = models.DateTimeField(auto_now_add=True)
   
    
    def __str__(self):
        return f"Bid of {self.parcel.parcel_label} acres by {self.bidder.username} for seller {self.listing.seller} for this amount {self.parcel.price}"




class BuyerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='buyer_profile')
    profilePhoto = models.ImageField(upload_to='profiles_pictures/', null=True, blank=True)
    phoneNumber = models.CharField(max_length=15, validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")])
    fullName = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return self.fullName
    

    def is_complete(self):
        required_fields = ['fullName', 'phoneNumber', 'address']
        for field_name in required_fields:
            value = getattr(self, field_name)
            if not value:
                return False
        return True
    

