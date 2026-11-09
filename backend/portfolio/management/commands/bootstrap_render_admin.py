import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Create the Render CMS administrator or update its password when explicitly enabled.'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', '').strip()
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', '').strip()
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', '')

        if not username or not email or not password:
            raise CommandError(
                'Set DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, and '
                'DJANGO_SUPERUSER_PASSWORD for the one-time initial setup.'
            )

        user_model = get_user_model()
        user = user_model.objects.filter(**{user_model.USERNAME_FIELD: username}).first()
        if user:
            update_password = os.environ.get('DJANGO_SUPERUSER_UPDATE_PASSWORD', '').lower() in (
                'true', '1', 'yes'
            )
            if not update_password:
                self.stdout.write('CMS administrator already exists; no changes made.')
                return

            user.email = email
            user.is_staff = True
            user.is_superuser = True
            user.set_password(password)
            user.save(update_fields=['email', 'is_staff', 'is_superuser', 'password'])
            self.stdout.write(self.style.SUCCESS('CMS administrator password updated.'))
            return

        user_model.objects.create_superuser(
            **{
                user_model.USERNAME_FIELD: username,
                'email': email,
                'password': password,
            }
        )
        self.stdout.write(self.style.SUCCESS('Initial CMS administrator created.'))
