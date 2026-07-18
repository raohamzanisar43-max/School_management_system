from django.contrib import admin
from .models import IslamicProfile, DailyProgressLog

class IslamicProfileAdmin(admin.ModelAdmin):
    list_display = ['student', 'tajweed_level', 'current_surah', 'current_ayat', 'hifz_completed_pages']
    list_filter = ['tajweed_level']
    search_fields = ['student__user__username', 'current_surah']

class DailyProgressLogAdmin(admin.ModelAdmin):
    list_display = ['profile', 'date', 'type', 'surah_name', 'evaluation_grade']
    list_filter = ['type', 'evaluation_grade', 'date']
    search_fields = ['profile__student__user__username', 'surah_name', 'tarbiyah_notes']

admin.site.register(IslamicProfile, IslamicProfileAdmin)
admin.site.register(DailyProgressLog, DailyProgressLogAdmin)
