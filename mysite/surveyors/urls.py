# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/surveyor-profiles/', views.SurveyorProfileCreateList.as_view(), name='surveyor_profile_list_create'),
    path('api/surveyors/', views.SurveyorListView.as_view(), name='surveyor-list'),
]

