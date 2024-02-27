from django.db import models
from django.contrib.auth.models import AbstractBaseUser,AbstractUser
from django.core.validators import MinLengthValidator



# Create your models here.
class CustomUser(AbstractUser):
    email=models.EmailField(null=False,blank=False)
    username = models.CharField(
        max_length=30,  # Adjust the max length as needed
        unique=True,
        validators=[MinLengthValidator(limit_value=5)],
        error_messages={
            'unique': 'A user with that username already exists.',
            'min_length': 'Username must have at least 5 characters.'
        }
    )











