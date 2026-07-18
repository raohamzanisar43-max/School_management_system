from django.db import models
from users.models import StudentProfile, TeacherProfile

class Program(models.Model):
    PROGRAM_CHOICES = (
        ('MONTESSORI', 'Montessori'),
        ('PRIMARY', 'Primary (Grade 1-5)'),
        ('MIDDLE', 'Middle School (Grade 6-8)'),
        ('O_LEVEL', 'O Levels'),
        ('IGCSE', 'IGCSE'),
        ('GED', 'GED'),
    )
    name = models.CharField(max_length=20, choices=PROGRAM_CHOICES, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.get_name_display()


class Course(models.Model):
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='courses')
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    syllabus = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.code})"


class Classroom(models.Model):
    name = models.CharField(max_length=100)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='classrooms')
    teacher = models.ForeignKey(TeacherProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='classrooms')
    students = models.ManyToManyField(StudentProfile, blank=True, related_name='classrooms')

    def __str__(self):
        return f"Class: {self.name} ({self.course.name})"


class TimetableSlot(models.Model):
    DAY_CHOICES = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
        ('SUN', 'Sunday'),
    )
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE, related_name='timetable')
    day_of_week = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    resource_details = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text="Virtual meeting URL, specific software tools, or textbook references"
    )

    def __str__(self):
        return f"{self.classroom.name} on {self.get_day_of_week_display()} at {self.start_time}-{self.end_time}"
