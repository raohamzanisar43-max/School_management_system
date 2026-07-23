from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LessonViewSet, AssignmentViewSet, AssignmentSubmissionViewSet

router = DefaultRouter()
router.register(r'lessons', LessonViewSet, basename='lesson')
router.register(r'assignments', AssignmentViewSet, basename='assignment')
router.register(r'submissions', AssignmentSubmissionViewSet, basename='assignment-submission')

urlpatterns = [
    path('', include(router.urls)),
]
