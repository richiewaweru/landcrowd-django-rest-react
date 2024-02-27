from django.urls import path
from .views import NotificationListView


urlpatterns = [
     path('api/notifications/', NotificationListView.as_view(), name='notification-list'),
]