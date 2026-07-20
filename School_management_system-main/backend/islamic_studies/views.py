from rest_framework import viewsets, permissions
from .models import IslamicProfile, DailyProgressLog
from .serializers import IslamicProfileSerializer, DailyProgressLogSerializer

class IslamicProfileViewSet(viewsets.ModelViewSet):
    queryset = IslamicProfile.objects.all()
    serializer_class = IslamicProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'tajweed_level']
    search_fields = ['current_surah']


class DailyProgressLogViewSet(viewsets.ModelViewSet):
    queryset = DailyProgressLog.objects.all()
    serializer_class = DailyProgressLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['profile', 'type', 'evaluation_grade', 'date']
    search_fields = ['surah_name', 'tarbiyah_notes']
