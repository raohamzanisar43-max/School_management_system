from rest_framework import serializers
from .models import StudentAnalyticsSummary, SessionEngagementLog
from users.serializers import StudentProfileSerializer

class StudentAnalyticsSummarySerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = StudentAnalyticsSummary
        fields = '__all__'


class SessionEngagementLogSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = SessionEngagementLog
        fields = '__all__'
