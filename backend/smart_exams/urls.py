from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ExamViewSet, 
    QuestionViewSet, 
    ExamAttemptViewSet, 
    ProctoringViolationLogViewSet
)

router = DefaultRouter()
router.register(r'tests', ExamViewSet, basename='exam')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'attempts', ExamAttemptViewSet, basename='examattempt')
router.register(r'violations', ProctoringViolationLogViewSet, basename='proctoringviolationlog')

urlpatterns = [
    path('', include(router.urls)),
]
