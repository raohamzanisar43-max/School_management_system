from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttendanceViewSet, DigitalDiaryViewSet

router = DefaultRouter()
router.register(r'logs', AttendanceViewSet, basename='attendance')
router.register(r'diaries', DigitalDiaryViewSet, basename='digital-diary')

urlpatterns = [
    path('', include(router.urls)),
]
