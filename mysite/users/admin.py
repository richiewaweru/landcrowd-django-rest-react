from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'username', 'user_type'] 
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('user_type',)}),  
    )

admin.site.register(CustomUser, CustomUserAdmin)
