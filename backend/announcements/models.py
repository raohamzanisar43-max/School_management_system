from django.db import models


class Announcement(models.Model):
    AUDIENCE_CHOICES = (
        ('ALL', 'All'),
        ('STUDENTS', 'Students'),
        ('TEACHERS', 'Teachers'),
        ('PARENTS', 'Parents'),
    )

    title = models.CharField(max_length=200)
    message = models.TextField()
    audience = models.CharField(max_length=15, choices=AUDIENCE_CHOICES, default='ALL')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
