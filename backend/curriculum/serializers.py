from rest_framework import serializers
from .models import Program, Course, Classroom, TimetableSlot
from users.serializers import StudentProfileSerializer, TeacherProfileSerializer

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    program_name = serializers.CharField(source='program.get_name_display', read_only=True)

    class Meta:
        model = Course
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):
    course_details = CourseSerializer(source='course', read_only=True)
    teacher_details = TeacherProfileSerializer(source='teacher', read_only=True)
    student_details = StudentProfileSerializer(source='students', many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = '__all__'


class TimetableSlotSerializer(serializers.ModelSerializer):
    classroom_name = serializers.CharField(source='classroom.name', read_only=True)
    day_display = serializers.CharField(source='get_day_of_week_display', read_only=True)

    class Meta:
        model = TimetableSlot
        fields = '__all__'
