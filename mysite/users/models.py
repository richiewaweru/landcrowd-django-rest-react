from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator

class CustomUser(AbstractUser):
    email = models.EmailField(blank=False, null=False)
    username = models.CharField(
        max_length=30,
        unique=True,
        validators=[MinLengthValidator(limit_value=5)],
        error_messages={
            'unique': 'A user with that username already exists.',
            'min_length': 'Username must have at least 5 characters.'
        }
    )
    
    USER_TYPE_CHOICES = (
        ('buyer', 'Buyer'),
        ('seller', 'Seller'),
        ('lawyer', 'Lawyer'),
        ('surveyor', 'Surveyor'),
    )
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='buyer')


    def is_profile_complete(self):
        if self.user_type == 'lawyer' and hasattr(self, 'lawyer_profile'):
            return self.lawyer_profile.is_complete()
        elif self.user_type == 'surveyor' and hasattr(self, 'surveyor_profile'):
            return self.surveyor_profile.is_complete()
        elif self.user_type == 'buyer' and hasattr(self, 'buyer_profile'):
            return self.buyer_profile.is_complete()
        elif self.user_type == 'seller' and hasattr(self, 'seller_profile'):
            return self.seller_profile.is_complete()
        else:
            return False













