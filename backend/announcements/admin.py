from django.contrib import admin
from .models import Announcement


class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'audience', 'created_at']
    list_filter = ['audience']
    search_fields = ['title', 'message']


admin.site.register(Announcement, AnnouncementAdmin)
