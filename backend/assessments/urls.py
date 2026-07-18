from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssessmentViewSet, AssessmentResultViewSet, PersonalizedCurriculumViewSet

router = DefaultRouter()
router.register(r'tests', AssessmentViewSet, basename='assessment')
router.register(r'results', AssessmentResultViewSet, basename='assessment-result')
router.register(r'personalized-plans', PersonalizedCurriculumViewSet, basename='personalized-curriculum')

urlpatterns = [
    path('', include(router.urls)),
]
