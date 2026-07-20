from django.contrib import admin
from .models import SkillTrack, StudentSkillProgress, ProjectSubmission

class SkillTrackAdmin(admin.ModelAdmin):
    list_display = ['name', 'level', 'description']
    list_filter = ['name', 'level']
    search_fields = ['name', 'description']

class StudentSkillProgressAdmin(admin.ModelAdmin):
    list_display = ['student', 'track', 'progress_percent', 'completed_projects_count', 'last_active']
    list_filter = ['track', 'progress_percent']
    search_fields = ['student__user__username', 'track__name']

class ProjectSubmissionAdmin(admin.ModelAdmin):
    list_display = ['title', 'student', 'track', 'grade', 'submitted_at']
    list_filter = ['track', 'grade', 'submitted_at']
    search_fields = ['student__user__username', 'title', 'project_url', 'teacher_review']

admin.site.register(SkillTrack, SkillTrackAdmin)
admin.site.register(StudentSkillProgress, StudentSkillProgressAdmin)
admin.site.register(ProjectSubmission, ProjectSubmissionAdmin)
