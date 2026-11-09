import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Create the initial Render CMS administrator from one-time environment variables.'

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
        if user_model.objects.filter(**{user_model.USERNAME_FIELD: username}).exists():
            self.stdout.write('CMS administrator already exists; no changes made.')
            return

        user_model.objects.create_superuser(
            **{
                user_model.USERNAME_FIELD: username,
                'email': email,
                'password': password,
            }
        )
        self.stdout.write(self.style.SUCCESS('Initial CMS administrator created.'))
