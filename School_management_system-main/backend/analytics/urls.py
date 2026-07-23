from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentAnalyticsSummaryViewSet, SessionEngagementLogViewSet

router = DefaultRouter()
router.register(r'summaries', StudentAnalyticsSummaryViewSet, basename='analytics-summary')
router.register(r'engagement-logs', SessionEngagementLogViewSet, basename='session-engagement-log')

urlpatterns = [
    path('', include(router.urls)),
]
