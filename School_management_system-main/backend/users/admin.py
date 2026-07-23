from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, StudentProfile, TeacherProfile, ParentProfile

class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Profile Settings', {'fields': ('role', 'phone_number', 'profile_picture')}),
    )
    list_display = ['username', 'email', 'role', 'phone_number', 'is_staff', 'is_active']
    list_filter = ['role', 'is_staff', 'is_active']
    search_fields = ['username', 'first_name', 'last_name', 'email', 'phone_number']
    ordering = ['username']

class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'parent', 'date_of_birth', 'current_level']
    list_filter = ['current_level']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'parent__username']

class TeacherProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'qualification', 'specialization']
    search_fields = ['user__username', 'user__first_name', 'user__last_name', 'specialization']

class ParentProfileAdmin(admin.ModelAdmin):
    list_display = ['user']
    search_fields = ['user__username', 'user__first_name', 'user__last_name']

admin.site.register(User, CustomUserAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(TeacherProfile, TeacherProfileAdmin)
admin.site.register(ParentProfile, ParentProfileAdmin)
