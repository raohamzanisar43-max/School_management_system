from django.db import models
from users.models import StudentProfile, TeacherProfile
from curriculum.models import Classroom

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('PRESENT', 'Present'),
        ('ABSENT', 'Absent'),
        ('LATE', 'Late'),
        ('LEAVE', 'On Leave'),
    )
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='attendance_records')
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PRESENT')

    class Meta:
        # Prevent double logging of attendance for the same day
        unique_together = (('student', 'date'), ('teacher', 'date'))

    def __str__(self):
        target = self.student.user.username if self.student else self.teacher.user.username
        role = "Student" if self.student else "Teacher"
        return f"{role} {target} - {self.date}: {self.get_status_display()}"


class DigitalDiary(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='diaries')
    date = models.DateField()
    homework_notes = models.TextField(blank=True, null=True)
    announcements = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('classroom', 'date')

    def __str__(self):
        return f"Diary for {self.classroom.name} on {self.date}"
