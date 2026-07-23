from rest_framework import viewsets, permissions
from .models import Exam, Question, ExamAttempt, ProctoringViolationLog
from .serializers import (
    ExamSerializer, 
    QuestionSerializer, 
    ExamAttemptSerializer, 
    ProctoringViolationLogSerializer
)

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['course', 'ai_proctoring_enabled']
    search_fields = ['title']


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['exam', 'type']
    search_fields = ['text']


class ExamAttemptViewSet(viewsets.ModelViewSet):
    queryset = ExamAttempt.objects.all()
    serializer_class = ExamAttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'exam']


class ProctoringViolationLogViewSet(viewsets.ModelViewSet):
    queryset = ProctoringViolationLog.objects.all()
    serializer_class = ProctoringViolationLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['attempt', 'violation_type']
