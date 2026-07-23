from rest_framework import serializers
from .models import Exam, Question, ExamAttempt, ProctoringViolationLog
from users.serializers import StudentProfileSerializer

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = '__all__'


class ExamAttemptSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = ExamAttempt
        fields = '__all__'


class ProctoringViolationLogSerializer(serializers.ModelSerializer):
    violation_display = serializers.CharField(source='get_violation_type_display', read_only=True)

    class Meta:
        model = ProctoringViolationLog
        fields = '__all__'
