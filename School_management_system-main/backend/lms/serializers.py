from rest_framework import serializers
from .models import Lesson, Assignment, AssignmentSubmission
from users.serializers import StudentProfileSerializer

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = AssignmentSubmission
        fields = '__all__'
