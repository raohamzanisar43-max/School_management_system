from rest_framework import viewsets, permissions
from .models import Lesson, Assignment, AssignmentSubmission
from .serializers import LessonSerializer, AssignmentSerializer, AssignmentSubmissionSerializer

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['course', 'scheduled_time']
    search_fields = ['title', 'content_body']


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['lesson', 'due_date']
    search_fields = ['title', 'instructions']


class AssignmentSubmissionViewSet(viewsets.ModelViewSet):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['assignment', 'student', 'grade']
