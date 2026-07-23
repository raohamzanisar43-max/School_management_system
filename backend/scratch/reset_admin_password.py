import os
import sys
import django

sys.path.append(os.path.abspath('.'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'homeschool_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

try:
    admin_user = User.objects.get(username="admin")
    admin_user.set_password("adminpassword")
    admin_user.save()
    print("Successfully reset 'admin' password to: adminpassword")
except User.DoesNotExist:
    print("'admin' user not found")

try:
    awais_user = User.objects.get(username="awais")
    awais_user.set_password("adminpassword")
    awais_user.save()
    print("Successfully reset 'awais' password to: adminpassword")
except User.DoesNotExist:
    print("'awais' user not found")
