from django.urls import path
from .views import UserCreate, UserUpdate ,LogoutAPIView,UserInfoView

urlpatterns = [
    path('api/user/create/', UserCreate.as_view(), name='user-create'),
    path('api/user/<int:pk>/update/', UserUpdate.as_view(), name='user-update'),
    path('api/user/logout/', LogoutAPIView.as_view(), name='user-logout'), 
    path('api/user-info/', UserInfoView.as_view(), name='user-info'), 
]


