from django.db import models
from users.models import StudentProfile, TeacherProfile

class Assessment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True, blank=True)
    is_admission_test = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AssessmentResult(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='assessment_results')
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    strengths = models.TextField(help_text="JSON or text detailing strengths")
    weaknesses = models.TextField(help_text="JSON or text detailing weaknesses")
    learning_gaps = models.TextField(help_text="JSON or text detailing learning gaps")
    recommendations = models.TextField()
    shared_with_parents = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} - {self.assessment.title} - Score: {self.score}"


class PersonalizedCurriculum(models.Model):
    student = models.OneToOneField(StudentProfile, on_delete=models.CASCADE, related_name='personalized_curriculum')
    assigned_level = models.CharField(max_length=50)
    recommended_courses = models.ManyToManyField('curriculum.Course', blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Curriculum for {self.student.user.username} (Level: {self.assigned_level})"
