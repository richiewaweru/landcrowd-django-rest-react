from django.contrib import admin

# Register your models here.

from .models import Bid,BuyerProfile
admin.site.register(Bid)

admin.site.register(BuyerProfile)