from django.db import models

# Create your models here.
from django.db import models
from users.models import CustomUser  # Import your custom user model




class LandListing(models.Model):
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE,null=False,related_name='listings')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    installment_options = models.BooleanField(default=False)
    telephone_number = models.CharField(max_length=20) 
    created_at = models.DateTimeField(auto_now_add=True)
    size= models.DecimalField(max_digits=10, decimal_places=2, help_text="Total land amount in acres")
    active_bid_size=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    LISTING_TYPE_CHOICES = [
        ('for sale', 'For Sale'),
        ('for lease', 'For Lease'),
    ]
    listing_type = models.CharField(max_length=9, choices=LISTING_TYPE_CHOICES, default='for sale',null=True)


    
  


    def __str__(self):
        return f"Land listing of land id {self.id} of {self.size} acres by {self.seller.username} in {self.location}"   
    

class LandListingImages(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='images', on_delete=models.CASCADE,null=True)
    land_listing = models.ForeignKey(LandListing, related_name='images', on_delete=models.CASCADE)
    land_images=models.ImageField(upload_to='land_images',null=True,blank=True)
   
   

    def __str__(self):
        return f"Image for {self.land_listing.location}"

class LandListingMaps(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='maps', on_delete=models.CASCADE,null=True)
    land_listing = models.ForeignKey(LandListing, related_name='maps', on_delete=models.CASCADE)
    land_map=models.ImageField(upload_to='land_maps',null=True,blank=True)

   

    def __str__(self):
        return f"Map for {self.land_listing.location}"






class Parcel(models.Model):
    seller = models.ForeignKey(CustomUser, related_name='parcels', on_delete=models.CASCADE,null=True)
    land_listing = models.ForeignKey(LandListing, on_delete=models.CASCADE, related_name='parcels')
    parcel_label = models.IntegerField(null=True)
    area = models.DecimalField(max_digits=10, decimal_places=2, help_text="Area of the parcel in acres")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Asking price for the parcel")
    status = models.CharField(max_length=50, choices=[('available', 'Available'), ('pending', 'Pending'), ('sold', 'Sold')], default='available')
 
    def __str__(self):
        return f"Parcel {self.parcel_label} of {self.land_listing}"

    