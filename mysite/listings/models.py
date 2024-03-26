from django.db import models

# Create your models here.
from django.db import models
from users.models import CustomUser 
from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator
from users.models import CustomUser




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
    description = models.TextField(null=True)

    def __str__(self):
        return f"Land listing of land id {self.id} of {self.size} acres by {self.seller.username} in {self.location}"   
    

class SellerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='seller_profile')
    profilePhoto = models.ImageField(upload_to='profiles_pictures/', null=True, blank=True)
    fullName= models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=15, validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")])
    landRegistrationNumber = models.CharField(max_length=255)
    landTitleDeedNumber = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.username}'s Seller Profile"
    
    def is_complete(self):
        required_fields = ['fullName', 'phoneNumber', 'landRegistrationNumber','landTitleDeedNumber']
        for field_name in required_fields:
            value = getattr(self, field_name)
            if not value:
                return False
        return True
    

    
    

    

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

    