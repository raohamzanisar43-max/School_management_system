from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('TEACHER', 'Teacher'),
        ('STUDENT', 'Student'),
        ('PARENT', 'Parent'),
    )
    
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='ADMIN')
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    parent = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        limit_choices_to={'role': 'PARENT'}, 
        related_name='children'
    )
    date_of_birth = models.DateField(null=True, blank=True)
    current_level = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"Student: {self.user.get_full_name() or self.user.username}"


class TeacherProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    qualification = models.CharField(max_length=100, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Teacher: {self.user.get_full_name() or self.user.username}"


class ParentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='parent_profile')

    def __str__(self):
        return f"Parent: {self.user.get_full_name() or self.user.username}"


# Signals to automatically create profiles when a User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'STUDENT':
            StudentProfile.objects.get_or_create(user=instance)
        elif instance.role == 'TEACHER':
            TeacherProfile.objects.get_or_create(user=instance)
        elif instance.role == 'PARENT':
            ParentProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.role == 'STUDENT' and hasattr(instance, 'student_profile'):
        instance.student_profile.save()
    elif instance.role == 'TEACHER' and hasattr(instance, 'teacher_profile'):
        instance.teacher_profile.save()
    elif instance.role == 'PARENT' and hasattr(instance, 'parent_profile'):
        instance.parent_profile.save()
