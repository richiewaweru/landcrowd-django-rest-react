# listings/permissions.py
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        #Read permissions are allowed to any request, i.e GET, HEAD or OPTIONS requests
        
        if request.method in permissions.SAFE_METHODS:
            return True

        # write permissions are only allowed to the owner of the listing.
        return obj.seller == request.user
