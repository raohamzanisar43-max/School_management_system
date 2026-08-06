from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError

USERNAME = "admin2"
EMAIL = "admin2@example.com"
PASSWORD = "Admin@123"


class Command(BaseCommand):
    help = "Idempotently creates the secondary superuser 'admin2' without touching any other account."

    def handle(self, *args, **options):
        User = get_user_model()

        if User.objects.filter(username=USERNAME).exists():
            self.stdout.write(f"Superuser '{USERNAME}' already exists. No changes made.")
            return

        if User.objects.filter(email=EMAIL).exists():
            raise CommandError(
                f"Email '{EMAIL}' is already used by another account; refusing to create a duplicate. "
                "Choose a different email."
            )

        extra_fields = {}
        if hasattr(User, "role"):
            extra_fields["role"] = "ADMIN"

        User.objects.create_superuser(
            username=USERNAME,
            email=EMAIL,
            password=PASSWORD,
            **extra_fields,
        )
        self.stdout.write(self.style.SUCCESS(f"Superuser '{USERNAME}' created."))
