from rest_framework import serializers
from .models import SkillTrack, StudentSkillProgress, ProjectSubmission
from users.serializers import StudentProfileSerializer

class SkillTrackSerializer(serializers.ModelSerializer):
    name_display = serializers.CharField(source='get_name_display', read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)

    class Meta:
        model = SkillTrack
        fields = '__all__'


class StudentSkillProgressSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    track_details = SkillTrackSerializer(source='track', read_only=True)

    class Meta:
        model = StudentSkillProgress
        fields = '__all__'


class ProjectSubmissionSerializer(serializers.ModelSerializer):
    student_details = StudentProfileSerializer(source='student', read_only=True)
    track_details = SkillTrackSerializer(source='track', read_only=True)

    class Meta:
        model = ProjectSubmission
        fields = '__all__'
