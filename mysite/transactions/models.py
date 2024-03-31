from django.db import models

# Create your models here.

from landbids.models import Bid,BuyerProfile
from lawyers.models import LawyerProfile
from surveyors.models import SurveyorProfile
from listings.models import LandListing,SellerProfile
from users.models import CustomUser





class Transaction(models.Model):
    listing=models.ForeignKey(LandListing, on_delete=models.CASCADE, related_name='transactions',null=True)
    bid = models.OneToOneField(Bid, on_delete=models.CASCADE, related_name='transaction',null=True)
    lawyer = models.ForeignKey(LawyerProfile, related_name='lawyer_transactions', on_delete=models.SET_NULL, null=True)
    surveyor = models.ForeignKey(SurveyorProfile, related_name='surveyor_transactions', on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, default='pending', choices=(('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed'), ('cancelled', 'Cancelled')))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
