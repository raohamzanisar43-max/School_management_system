from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

USERNAME = "admin"
EMAIL = "admin@example.com"
PASSWORD = "Admin@123"


class Command(BaseCommand):
    help = "Idempotently creates (or repairs) the default superuser. Safe to run multiple times."

    def handle(self, *args, **options):
        User = get_user_model()

        user, created = User.objects.get_or_create(
            username=USERNAME,
            defaults={"email": EMAIL},
        )

        if created:
            user.email = EMAIL
            user.set_password(PASSWORD)
            user.is_staff = True
            user.is_superuser = True
            user.is_active = True
            if hasattr(user, "role"):
                user.role = "ADMIN"
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Superuser '{USERNAME}' created."))
        else:
            changed = False
            if not user.is_staff:
                user.is_staff = True
                changed = True
            if not user.is_superuser:
                user.is_superuser = True
                changed = True
            if not user.is_active:
                user.is_active = True
                changed = True
            if user.email != EMAIL:
                user.email = EMAIL
                changed = True
            if hasattr(user, "role") and user.role != "ADMIN":
                user.role = "ADMIN"
                changed = True
            if not user.check_password(PASSWORD):
                user.set_password(PASSWORD)
                changed = True

            if changed:
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Superuser '{USERNAME}' already existed; credentials/permissions synced."))
            else:
                self.stdout.write(f"Superuser '{USERNAME}' already exists and is up to date. No changes made.")
