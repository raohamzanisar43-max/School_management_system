import os
import sys
import django

# Add backend to path
sys.path.append(os.path.abspath('.'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'homeschool_backend.settings')
django.setup()

from smart_exams.models import Exam
print("Exams Count:", Exam.objects.count())
for e in Exam.objects.all():
    print(f"Exam: {e.title}, Course: {e.course.name}, Questions: {e.questions.count()}")
