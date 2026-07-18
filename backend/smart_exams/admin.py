from django.contrib import admin
from .models import Exam, Question, ExamAttempt, ProctoringViolationLog

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1

class ExamAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'duration_minutes', 'ai_proctoring_enabled', 'created_at']
    list_filter = ['ai_proctoring_enabled', 'course']
    search_fields = ['title', 'course__name']
    inlines = [QuestionInline]

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['id', 'exam', 'type', 'text']
    list_filter = ['type', 'exam']
    search_fields = ['text', 'correct_answer']

class ExamAttemptAdmin(admin.ModelAdmin):
    list_display = ['student', 'exam', 'score', 'started_at', 'submitted_at']
    list_filter = ['exam', 'started_at']
    search_fields = ['student__user__username', 'exam__title']

class ProctoringViolationLogAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'violation_type', 'confidence_score', 'timestamp']
    list_filter = ['violation_type', 'timestamp']
    search_fields = ['attempt__student__user__username', 'violation_type']

admin.site.register(Exam, ExamAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(ExamAttempt, ExamAttemptAdmin)
admin.site.register(ProctoringViolationLog, ProctoringViolationLogAdmin)
