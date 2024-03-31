from django.urls import path


from django.urls import path,include
from .views import TransactionsListView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('transactions', TransactionsListView, basename='transaction')
urlpatterns = [
    path('api/', include(router.urls)),
]

