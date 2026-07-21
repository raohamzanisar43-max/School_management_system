from rest_framework import viewsets, permissions
from .models import Assessment, AssessmentResult, PersonalizedCurriculum
from .serializers import AssessmentSerializer, AssessmentResultSerializer, PersonalizedCurriculumSerializer

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['is_admission_test', 'created_by']
    search_fields = ['title', 'description']


class AssessmentResultViewSet(viewsets.ModelViewSet):
    queryset = AssessmentResult.objects.all()
    serializer_class = AssessmentResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'assessment', 'shared_with_parents']
    search_fields = ['strengths', 'weaknesses', 'learning_gaps']


class PersonalizedCurriculumViewSet(viewsets.ModelViewSet):
    queryset = PersonalizedCurriculum.objects.all()
    serializer_class = PersonalizedCurriculumSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'assigned_level']
