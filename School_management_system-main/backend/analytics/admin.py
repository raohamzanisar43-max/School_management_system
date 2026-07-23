from django.contrib import admin
from .models import StudentAnalyticsSummary, SessionEngagementLog

class StudentAnalyticsSummaryAdmin(admin.ModelAdmin):
    list_display = ['student', 'understanding_index', 'concentration_score', 'engagement_score', 'academic_strength', 'academic_weakness', 'last_updated']
    list_filter = ['last_updated']
    search_fields = ['student__user__username', 'academic_strength', 'academic_weakness']

class SessionEngagementLogAdmin(admin.ModelAdmin):
    list_display = ['student', 'lesson', 'duration_seconds', 'attention_percentage', 'logged_at']
    list_filter = ['logged_at']
    search_fields = ['student__user__username', 'lesson__title']

admin.site.register(StudentAnalyticsSummary, StudentAnalyticsSummaryAdmin)
admin.site.register(SessionEngagementLog, SessionEngagementLogAdmin)
