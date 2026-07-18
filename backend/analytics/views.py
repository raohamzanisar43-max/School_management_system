from rest_framework import viewsets, permissions
from .models import StudentAnalyticsSummary, SessionEngagementLog
from .serializers import StudentAnalyticsSummarySerializer, SessionEngagementLogSerializer

class StudentAnalyticsSummaryViewSet(viewsets.ModelViewSet):
    queryset = StudentAnalyticsSummary.objects.all()
    serializer_class = StudentAnalyticsSummarySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student']
    search_fields = ['academic_strength', 'academic_weakness']


class SessionEngagementLogViewSet(viewsets.ModelViewSet):
    queryset = SessionEngagementLog.objects.all()
    serializer_class = SessionEngagementLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'lesson']
