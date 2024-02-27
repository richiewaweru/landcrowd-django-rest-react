from rest_framework import generics, permissions
from .models import LandListing, LandListingImages,LandListingMaps,Parcel
from .serializers import LandListingSerializer, LandListingImagesSerializer,LandListingMapsSerializer,ParcelSerializer
from rest_framework.generics import RetrieveUpdateDestroyAPIView,ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .permissions import IsOwnerOrReadOnly 
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from rest_framework.exceptions import PermissionDenied
from notifications.models import Notification
from landbids.models import Bid


class LandListingCreateAPIView(ListCreateAPIView):
    queryset = LandListing.objects.all()
    serializer_class = LandListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class LandListingDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = LandListing.objects.all()
    serializer_class = LandListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()



class LandListingImagesListAPIView(generics.ListCreateAPIView):
    serializer_class = LandListingImagesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]




    def get_queryset(self):
        
        """
        Optionally filters the queryset by land_listing_id if provided in the URL.
        """
        land_listing_id = self.kwargs.get('land_listing_id', None)
        if land_listing_id is not None:
            return LandListingImages.objects.filter(land_listing__id=land_listing_id)
        return LandListingImages.objects.none()  # Return an empty queryset if no land_listing_id is provided

    def perform_create(self, serializer):
        """
        Associates the new resource with a land listing based on the land_listing_id URL parameter.
        """
        land_listing_id = self.kwargs.get('land_listing_id')
        print(land_listing_id)
        if land_listing_id is None:
            raise ValidationError("land_listing_id is required for creating a resource.")
        
        land_listing = get_object_or_404(LandListing, id=land_listing_id)
        if land_listing.seller != self.request.user:      
            raise PermissionDenied("You do not have permission to add images to this listing.")
        serializer.save(land_listing=land_listing, seller=self.request.user)



class LandListingImagesDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LandListingImages.objects.all()
    serializer_class = LandListingImagesSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()






class LandListingMapsListAPIView(generics.ListCreateAPIView):
    serializer_class = LandListingMapsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Optionally filters the queryset by land_listing_id if provided in the URL.
        """
        land_listing_id = self.kwargs.get('land_listing_id', None)
        if land_listing_id is not None:
            return LandListingMaps.objects.filter(land_listing__id=land_listing_id)
        return self.queryset.none()  # Return an empty queryset if no land_listing_id is provided

    def perform_create(self, serializer):
        """
        Associates the new map with a land listing based on the land_listing_id URL parameter.
        """
        land_listing_id = self.kwargs.get('land_listing_id')
        if land_listing_id is None:
            raise ValidationError("land_listing_id is required for creating a resource.")

        land_listing = get_object_or_404(LandListing, id=land_listing_id)
        if land_listing.seller != self.request.user:      
            raise PermissionDenied("You do not have permission to add images to this listing.")
        serializer.save(land_listing=land_listing, seller=self.request.user)




class LandListingMapsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LandListingMaps.objects.all()
    serializer_class = LandListingMapsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()



class UserLandListingsView(generics.ListAPIView):
    serializer_class = LandListingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        The view returns a list of all the land listings
        for the currently authenticated user.
        """
        user = self.request.user
        return LandListing.objects.filter(seller=user).order_by('-created_at')




class LandListingsFilteredView(generics.ListAPIView):
    serializer_class = LandListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Optionally restricts the returned land listings to a given type,
        by filtering against a 'listing_type' query parameter in the URL.
        """
        queryset = LandListing.objects.all().order_by('-created_at')
        listing_type = self.request.query_params.get('listing_type', None)
        if listing_type is not None:
            queryset = queryset.filter(listing_type=listing_type)
        return queryset





class ParcelListAPIView(generics.ListCreateAPIView):
    serializer_class = ParcelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

 
    def get_queryset(self):
        """
        Optionally filters the queryset by land_listing_id if provided in the URL.
        """
        land_listing_id = self.kwargs.get('land_listing_id', None)
        if land_listing_id is not None:
            return Parcel.objects.filter(land_listing__id=land_listing_id)
        return self.queryset.none()  # Return an empty queryset if no land_listing_id is provided

    def perform_create(self, serializer):
        """
        Associates the new map with a land listing based on the land_listing_id URL parameter.
        """
        land_listing_id = self.kwargs.get('land_listing_id')
        if land_listing_id is None:
            raise ValidationError("land_listing_id is required for creating a resource.")


        land_listing = get_object_or_404(LandListing, id=land_listing_id)
        if land_listing.seller != self.request.user:      
            raise PermissionDenied("You do not have permission to add images to this listing.")
        serializer.save(land_listing=land_listing, seller=self.request.user)


class ParcelAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Parcel.objects.all()
    serializer_class = ParcelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_destroy(self, instance):
        bids = Bid.objects.filter(parcel=instance)
        if bids.exists():
            # If there are bids, WE create a notification for each bid
            for bid in bids:
                Notification.objects.create(
                    recipient=bid.bidder,
                    message=f"The parcel {instance.parcel_label} you bid on has been deleted.",
                    notification_type='parcel_deleted',
                    parcel=instance
                )
        else:
            # If there are no bids we continue with normal deletion
        
            instance.delete()

   