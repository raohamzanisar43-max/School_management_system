from django.db import models
from users.models import StudentProfile

class SkillTrack(models.Model):
    TRACK_CHOICES = (
        ('AI', 'Artificial Intelligence'),
        ('ROBOTICS', 'Robotics'),
        ('PYTHON', 'Python Coding'),
        ('SCRATCH', 'Scratch coding'),
        ('GRAPHIC_DESIGN', 'Graphic Design'),
        ('DIGITAL_SKILLS', 'Digital Skills'),
    )
    LEVEL_CHOICES = (
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
    )
    name = models.CharField(max_length=20, choices=TRACK_CHOICES)
    level = models.CharField(max_length=15, choices=LEVEL_CHOICES)
    description = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('name', 'level')

    def __str__(self):
        return f"{self.get_name_display()} ({self.get_level_display()})"


class StudentSkillProgress(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='skill_progress')
    track = models.ForeignKey(SkillTrack, on_delete=models.CASCADE)
    progress_percent = models.IntegerField(default=0, help_text="Percentage 0-100")
    completed_projects_count = models.IntegerField(default=0)
    last_active = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'track')

    def __str__(self):
        return f"{self.student.user.username} - {self.track} - {self.progress_percent}%"


class ProjectSubmission(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='skill_projects')
    track = models.ForeignKey(SkillTrack, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    project_url = models.URLField(help_text="Link to GitHub, Scratch, or cloud drive folder")
    teacher_review = models.TextField(blank=True, null=True)
    grade = models.CharField(max_length=10, blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} project: {self.title}"
