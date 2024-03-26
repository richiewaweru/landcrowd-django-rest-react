# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/lawyer_profiles/', views.LawyerProfileCreateList.as_view(), name='lawyer_profile_list_create'),
    path('api/lawyers/', views.LawyerListView.as_view(), name='lawyer-list'),
]

