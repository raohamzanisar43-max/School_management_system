from rest_framework import viewsets, permissions
from .models import SkillTrack, StudentSkillProgress, ProjectSubmission
from .serializers import SkillTrackSerializer, StudentSkillProgressSerializer, ProjectSubmissionSerializer

class SkillTrackViewSet(viewsets.ModelViewSet):
    queryset = SkillTrack.objects.all()
    serializer_class = SkillTrackSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['name', 'level']


class StudentSkillProgressViewSet(viewsets.ModelViewSet):
    queryset = StudentSkillProgress.objects.all()
    serializer_class = StudentSkillProgressSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'track']


class ProjectSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ProjectSubmission.objects.all()
    serializer_class = ProjectSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'track', 'grade']
    search_fields = ['title', 'project_url']
