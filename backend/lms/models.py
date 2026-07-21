from django.db import models
from curriculum.models import Course
from users.models import StudentProfile

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    content_body = models.TextField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="URL for recorded lecture video")
    zoom_link = models.URLField(blank=True, null=True, help_text="URL for live interactive session")
    scheduled_time = models.DateTimeField(blank=True, null=True, help_text="Start time for live session")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course.code} - {self.title}"


class Assignment(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    instructions = models.TextField()
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AssignmentSubmission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)
    file_attachment = models.FileField(upload_to='assignments/submissions/', blank=True, null=True)
    grade = models.CharField(max_length=10, blank=True, null=True)
    teacher_feedback = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('assignment', 'student')

    def __str__(self):
        return f"{self.student.user.username} submitted {self.assignment.title}"
