from django.db import models
from curriculum.models import Course
from users.models import StudentProfile

class Exam(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='exams')
    title = models.CharField(max_length=200)
    duration_minutes = models.IntegerField(default=60)
    ai_proctoring_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.course.name})"


class Question(models.Model):
    TYPE_CHOICES = (
        ('MCQ', 'Multiple Choice Question'),
        ('SUBJECTIVE', 'Subjective / Theory'),
    )
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    type = models.CharField(max_length=15, choices=TYPE_CHOICES, default='MCQ')
    options = models.JSONField(blank=True, null=True, help_text="List of choices for MCQ, e.g. ['A', 'B', 'C', 'D']")
    correct_answer = models.TextField(help_text="Correct answer text or option letter")

    def __str__(self):
        return f"Question {self.id} on {self.exam.title}"


class ExamAttempt(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='exam_attempts')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.user.username} attempt: {self.exam.title}"


class ProctoringViolationLog(models.Model):
    VIOLATION_CHOICES = (
        ('FACE_NOT_FOUND', 'No Face Detected'),
        ('MULTIPLE_FACES', 'Multiple Faces Detected'),
        ('TAB_SWITCH', 'Browser Tab Switched'),
        ('SPEECH_DETECTED', 'Speech/Voice Detected'),
        ('UNKNOWN_OBJECT', 'Restricted Object/Phone Detected'),
    )
    attempt = models.ForeignKey(ExamAttempt, on_delete=models.CASCADE, related_name='violations')
    timestamp = models.DateTimeField(auto_now_add=True)
    violation_type = models.CharField(max_length=20, choices=VIOLATION_CHOICES)
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2, help_text="AI Model Confidence percentage (e.g. 98.50)")

    def __str__(self):
        return f"Violation {self.get_violation_type_display()} on {self.attempt.student.user.username}'s test"
