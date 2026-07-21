from django.db import models
from users.models import StudentProfile
from lms.models import Lesson
from django.db.models.signals import post_save
from django.dispatch import receiver

class StudentAnalyticsSummary(models.Model):
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='analytics_summary')
    understanding_index = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, help_text="AI estimated understanding rating (0.0 - 100.0)")
    concentration_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, help_text="AI calculated concentration rating (0.0 - 100.0)")
    engagement_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0, help_text="AI calculated class engagement rating (0.0 - 100.0)")
    academic_strength = models.CharField(max_length=255, blank=True, null=True)
    academic_weakness = models.CharField(max_length=255, blank=True, null=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Analytics: {self.student.user.username}"


class SessionEngagementLog(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='session_engagement_logs')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='session_engagement_logs')
    duration_seconds = models.IntegerField(default=0)
    attention_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=100.0)
    logged_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} in {self.lesson.title} - Attention: {self.attention_percentage}%"


# Signals to auto-create Analytics summary when StudentProfile is created
@receiver(post_save, sender=StudentProfile)
def create_student_analytics(sender, instance, created, **kwargs):
    if created:
        StudentAnalyticsSummary.objects.get_or_create(student=instance)

@receiver(post_save, sender=StudentProfile)
def save_student_analytics(sender, instance, **kwargs):
    if hasattr(instance, 'analytics_summary'):
        instance.analytics_summary.save()
