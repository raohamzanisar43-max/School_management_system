from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IslamicProfileViewSet, DailyProgressLogViewSet

router = DefaultRouter()
router.register(r'profiles', IslamicProfileViewSet, basename='islamic-profile')
router.register(r'progress-logs', DailyProgressLogViewSet, basename='islamic-progress-log')

urlpatterns = [
    path('', include(router.urls)),
]
