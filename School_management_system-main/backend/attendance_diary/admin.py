from django.contrib import admin
from .models import Attendance, DigitalDiary

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['get_name', 'get_role', 'date', 'status']
    list_filter = ['status', 'date']
    search_fields = ['student__user__username', 'teacher__user__username']

    def get_name(self, obj):
        return obj.student.user.username if obj.student else obj.teacher.user.username
    get_name.short_description = 'User'

    def get_role(self, obj):
        return 'Student' if obj.student else 'Teacher'
    get_role.short_description = 'Role'

class DigitalDiaryAdmin(admin.ModelAdmin):
    list_display = ['classroom', 'date', 'homework_notes', 'announcements']
    list_filter = ['date', 'classroom']
    search_fields = ['classroom__name', 'homework_notes', 'announcements']

admin.site.register(Attendance, AttendanceAdmin)
admin.site.register(DigitalDiary, DigitalDiaryAdmin)
