from rest_framework import serializers
from .models import IslamicProfile, DailyProgressLog
from users.serializers import StudentProfileSerializer

class IslamicProfileSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = IslamicProfile
        fields = '__all__'


class DailyProgressLogSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    evaluation_display = serializers.CharField(source='get_evaluation_grade_display', read_only=True)

    class Meta:
        model = DailyProgressLog
        fields = '__all__'
