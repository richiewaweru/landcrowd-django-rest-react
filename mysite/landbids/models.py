from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from listings.models import LandListing  ,Parcel ,  LandListingMaps ,LandListingImages
from users.models import CustomUser  

class Bid(models.Model):
    
    bidder = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bids',null=True)
    listing = models.ForeignKey(LandListing, on_delete=models.CASCADE, related_name='bids_on_listing',null=True)
    parcel = models.ForeignKey(Parcel, on_delete=models.CASCADE, related_name='bids_on_parcel',null=True)
    created_at = models.DateTimeField(auto_now_add=True)
   
    
    def __str__(self):
        return f"Bid of {self.parcel.parcel_label} acres by {self.bidder.username} for seller {self.listing.seller} for this amount {self.parcel.price}"

