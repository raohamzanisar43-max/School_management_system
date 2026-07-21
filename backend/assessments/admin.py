from django.contrib import admin
from .models import Assessment, AssessmentResult, PersonalizedCurriculum

class AssessmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_admission_test', 'created_by', 'created_at']
    list_filter = ['is_admission_test', 'created_at']
    search_fields = ['title', 'description', 'created_by__user__username']

class AssessmentResultAdmin(admin.ModelAdmin):
    list_display = ['student', 'assessment', 'score', 'shared_with_parents', 'created_at']
    list_filter = ['shared_with_parents', 'created_at', 'assessment']
    search_fields = ['student__user__username', 'assessment__title', 'strengths', 'weaknesses', 'learning_gaps']

class PersonalizedCurriculumAdmin(admin.ModelAdmin):
    list_display = ['student', 'assigned_level', 'last_updated']
    list_filter = ['assigned_level', 'last_updated']
    search_fields = ['student__user__username', 'assigned_level']
    filter_horizontal = ['recommended_courses']

admin.site.register(Assessment, AssessmentAdmin)
admin.site.register(AssessmentResult, AssessmentResultAdmin)
admin.site.register(PersonalizedCurriculum, PersonalizedCurriculumAdmin)
