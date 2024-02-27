from django.urls import path
from . import views

app_name = 'listings'
from django.urls import path
from .views import ( LandListingCreateAPIView,
    LandListingDetailAPIView,
    LandListingImagesListAPIView, LandListingImagesDetailAPIView,LandListingMapsListAPIView,LandListingMapsDetailAPIView,ParcelAPIView,ParcelListAPIView,UserLandListingsView,LandListingsFilteredView
)

urlpatterns = [
    #pass the land_lisitng variable for it to be recorded
    path('api/landlistings/', LandListingCreateAPIView.as_view(), name='landlisting-list-create'),
    path('api/landlistings/<int:pk>/', LandListingDetailAPIView.as_view(), name='landlisting-detail'),
    path('api/landlisting-images/<int:land_listing_id>/', LandListingImagesListAPIView.as_view(), name='landlisting-images-list'),
    path('api/landlisting-images/update/<int:pk>/', LandListingImagesDetailAPIView.as_view(), name='landlisting-images-detail'),
    path('api/landlisting-maps/<int:land_listing_id>/', LandListingMapsListAPIView.as_view(), name='landlisting-maps-list'),
    path('api/landlisting-maps/update/<int:pk>/', LandListingMapsDetailAPIView.as_view(), name='landlisting-maps-detail'),
    path('api/parcel/<int:land_listing_id>/', ParcelListAPIView.as_view(), name='landlisting-maps-list'),
    path('api/parcel/update/<int:pk>/', ParcelAPIView.as_view(), name='landlisting-maps-detail'),
    path('api/landlistings/<int:land_listing_id>/images/', LandListingImagesListAPIView.as_view(), name='landlisting-images'),
    path('api/landlistings/<int:land_listing_id>/maps/',LandListingMapsListAPIView.as_view(), name='landlisting-map'),
    path('api/user/landlistings/', UserLandListingsView.as_view(), name='user-landlistings'),
    path('api/listings/', LandListingsFilteredView.as_view(), name='user-landlistings'),
]






 