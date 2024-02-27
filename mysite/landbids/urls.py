
from django.urls import path
from .views import BidCreateView, BidHistoryView, UserBidsView, BidDetailAPIView

urlpatterns = [
    path('api/listing/<int:listing_id>/bid/', BidCreateView.as_view(), name='bid-create'),
    path('api/listing/<int:listing_id>/bids/', BidHistoryView.as_view(), name='bid-history'),
    path('api/user/bids/', UserBidsView.as_view(), name='user-bids'),
    path('api/listing/bids/<int:pk>/', BidDetailAPIView.as_view(), name='bid-detail'),
]
