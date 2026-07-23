from rest_framework import viewsets, permissions
from .models import Attendance, DigitalDiary
from .serializers import AttendanceSerializer, DigitalDiarySerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['student', 'teacher', 'status', 'date']


class DigitalDiaryViewSet(viewsets.ModelViewSet):
    queryset = DigitalDiary.objects.all()
    serializer_class = DigitalDiarySerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['classroom', 'date']
    search_fields = ['homework_notes', 'announcements']
