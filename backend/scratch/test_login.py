import os
import sys
import django

sys.path.append(os.path.abspath('.'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'homeschool_backend.settings')
django.setup()

from django.contrib.auth import authenticate
user = authenticate(username="admin", password="adminpassword")
print(f"Authentication result for 'admin': {user}")

user_awais = authenticate(username="awais", password="adminpassword")
print(f"Authentication result for 'awais': {user_awais}")
