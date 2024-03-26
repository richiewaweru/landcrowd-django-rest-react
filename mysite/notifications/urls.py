from django.urls import path,include
from .views import NotificationListView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('notifications', NotificationListView, basename='notification')
urlpatterns = [
    path('api/', include(router.urls)),
]


