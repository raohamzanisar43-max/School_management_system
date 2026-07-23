import os
import sys
import django

sys.path.append(os.path.abspath('.'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'homeschool_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()
print("Users in Local DB:")
for u in User.objects.all():
    print(f"Username: {u.username}, IsSuperuser: {u.is_superuser}, IsStaff: {u.is_staff}, Role: {getattr(u, 'role', 'None')}")
