from django.db import models
from users.models import StudentProfile
from django.db.models.signals import post_save
from django.dispatch import receiver

class IslamicProfile(models.Model):
    TAJWEED_CHOICES = (
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    )
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='islamic_profile')
    current_surah = models.CharField(max_length=100, blank=True, null=True)
    current_ayat = models.IntegerField(default=1)
    hifz_completed_pages = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    tajweed_level = models.CharField(max_length=20, choices=TAJWEED_CHOICES, default='BEGINNER')

    def __str__(self):
        return f"Islamic Profile: {self.student.user.username}"


class DailyProgressLog(models.Model):
    LOG_TYPE_CHOICES = (
        ('HIFAZ', 'Hifz (Memorization)'),
        ('NAZRA', 'Nazra (Reading)'),
        ('TAJWEED', 'Tajweed (Rules)'),
        ('TARBIYAH', 'Tarbiyah (Character)'),
        ('ISLAMIC_STUDIES', 'Islamic Studies (Theory)'),
    )
    EVALUATION_CHOICES = (
        ('EXCELLENT', 'Excellent'),
        ('GOOD', 'Good'),
        ('IMPROVING', 'Needs Improvement'),
    )
    profile = models.ForeignKey(IslamicProfile, on_delete=models.CASCADE, related_name='daily_logs')
    date = models.DateField()
    type = models.CharField(max_length=20, choices=LOG_TYPE_CHOICES)
    surah_name = models.CharField(max_length=100, blank=True, null=True)
    from_ayat = models.IntegerField(blank=True, null=True)
    to_ayat = models.IntegerField(blank=True, null=True)
    evaluation_grade = models.CharField(max_length=15, choices=EVALUATION_CHOICES)
    tarbiyah_notes = models.TextField(blank=True, null=True, help_text="Character and behavior notes")

    def __str__(self):
        return f"{self.profile.student.user.username} - {self.get_type_display()} on {self.date}"


# Automatically create Islamic Profile when a StudentProfile is created
@receiver(post_save, sender=StudentProfile)
def create_student_islamic_profile(sender, instance, created, **kwargs):
    if created:
        IslamicProfile.objects.get_or_create(student=instance)

@receiver(post_save, sender=StudentProfile)
def save_student_islamic_profile(sender, instance, **kwargs):
    if hasattr(instance, 'islamic_profile'):
        instance.islamic_profile.save()
