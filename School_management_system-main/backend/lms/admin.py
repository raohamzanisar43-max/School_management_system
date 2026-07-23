from django.contrib import admin
from .models import Lesson, Assignment, AssignmentSubmission

class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'scheduled_time', 'zoom_link', 'video_url']
    list_filter = ['course', 'scheduled_time']
    search_fields = ['title', 'content_body', 'course__name']

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'lesson', 'due_date', 'created_at']
    list_filter = ['due_date', 'lesson__course']
    search_fields = ['title', 'instructions', 'lesson__title']

class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ['assignment', 'student', 'submitted_at', 'grade']
    list_filter = ['grade', 'submitted_at', 'assignment']
    search_fields = ['student__user__username', 'assignment__title', 'teacher_feedback']

admin.site.register(Lesson, LessonAdmin)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(AssignmentSubmission, AssignmentSubmissionAdmin)
