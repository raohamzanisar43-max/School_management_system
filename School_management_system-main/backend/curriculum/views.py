from rest_framework import viewsets, permissions
from .models import Program, Course, Classroom, TimetableSlot
from .serializers import ProgramSerializer, CourseSerializer, ClassroomSerializer, TimetableSlotSerializer

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['program']
    search_fields = ['name', 'code', 'syllabus']


class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['course', 'teacher']
    search_fields = ['name']


class TimetableSlotViewSet(viewsets.ModelViewSet):
    queryset = TimetableSlot.objects.all()
    serializer_class = TimetableSlotSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ['classroom', 'day_of_week']
