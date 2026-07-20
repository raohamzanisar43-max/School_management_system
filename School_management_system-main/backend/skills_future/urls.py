from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillTrackViewSet, StudentSkillProgressViewSet, ProjectSubmissionViewSet

router = DefaultRouter()
router.register(r'tracks', SkillTrackViewSet, basename='skill-track')
router.register(r'progress', StudentSkillProgressViewSet, basename='student-skill-progress')
router.register(r'projects', ProjectSubmissionViewSet, basename='project-submission')

urlpatterns = [
    path('', include(router.urls)),
]
