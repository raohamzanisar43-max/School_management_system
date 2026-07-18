from django.contrib import admin
from .models import Program, Course, Classroom, TimetableSlot

class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']

class CourseAdmin(admin.ModelAdmin):
    list_display = ['name', 'code', 'program']
    list_filter = ['program']
    search_fields = ['name', 'code', 'syllabus']

class ClassroomAdmin(admin.ModelAdmin):
    list_display = ['name', 'course', 'teacher']
    list_filter = ['course', 'teacher']
    search_fields = ['name', 'course__name', 'teacher__user__username']
    filter_horizontal = ['students']

class TimetableSlotAdmin(admin.ModelAdmin):
    list_display = ['classroom', 'day_of_week', 'start_time', 'end_time', 'resource_details']
    list_filter = ['day_of_week', 'classroom__course']
    search_fields = ['classroom__name', 'resource_details']

admin.site.register(Program, ProgramAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Classroom, ClassroomAdmin)
admin.site.register(TimetableSlot, TimetableSlotAdmin)
