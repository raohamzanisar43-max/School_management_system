from rest_framework import serializers
from .models import Assessment, AssessmentResult, PersonalizedCurriculum
from users.serializers import StudentProfileSerializer

class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = '__all__'


class AssessmentResultSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = AssessmentResult
        fields = '__all__'


class PersonalizedCurriculumSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)

    class Meta:
        model = PersonalizedCurriculum
        fields = '__all__'
