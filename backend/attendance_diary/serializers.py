from rest_framework import serializers
from .models import Attendance, DigitalDiary
from users.serializers import StudentProfileSerializer, TeacherProfileSerializer

class AttendanceSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    teacher_details = TeacherProfileSerializer(source='teacher', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'


class DigitalDiarySerializer(serializers.ModelSerializer):
    classroom_name = serializers.CharField(source='classroom.name', read_only=True)

    class Meta:
        model = DigitalDiary
        fields = '__all__'
