from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserRegistrationView, 
    UserProfileView, 
    StudentProfileViewSet, 
    TeacherProfileViewSet, 
    ParentProfileViewSet
)

router = DefaultRouter()
router.register(r'students', StudentProfileViewSet, basename='student-profile')
router.register(r'teachers', TeacherProfileViewSet, basename='teacher-profile')
router.register(r'parents', ParentProfileViewSet, basename='parent-profile')

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('me/', UserProfileView.as_view(), name='profile-me'),
    path('', include(router.urls)),
]
