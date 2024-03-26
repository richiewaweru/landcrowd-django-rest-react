from django.db import models
# Create your models here.
from users.models import CustomUser


from django.conf import settings
from django.core.validators import RegexValidator, EmailValidator

class LawyerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='lawyer_profile')
    profilePhoto = models.ImageField(upload_to='profiles_pictures/', null=True, blank=True)
    fullName = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=15, validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")])
    email = models.EmailField(validators=[EmailValidator()], blank=True, null=True) 
    licenseNumber = models.CharField(max_length=255, unique=True)  
    address = models.TextField()

    def __str__(self):
        return self.fullName
    

    def is_complete(self):
        required_fields = ['fullName', 'phoneNumber', 'licenseNumber', 'address']
        for field_name in required_fields:
            value = getattr(self, field_name)
            if not value:
                return False
        return True
