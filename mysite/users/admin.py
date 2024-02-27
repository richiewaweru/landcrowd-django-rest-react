from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin


from .models import CustomUser


class CustomerAdmin(UserAdmin):
    model=CustomUser
    list_display=["email","username"]

admin.site.register(CustomUser,CustomerAdmin)
