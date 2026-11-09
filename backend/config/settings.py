"""
Django settings for Dr. Musheer Ahmad Portfolio & Research Lab CMS.
"""

from pathlib import Path
import os
import dj_database_url
from datetime import timedelta
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = os.environ.get('DJANGO_DEBUG', 'True').lower() in ('true', '1', 'yes')

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured('Set DJANGO_SECRET_KEY when DEBUG is disabled.')
    SECRET_KEY = 'django-insecure-local-development-key-only'

def env_list(name: str, default: str = '') -> list[str]:
    return [value.strip() for value in os.environ.get(name, default).split(',') if value.strip()]


ALLOWED_HOSTS = env_list('ALLOWED_HOSTS', 'localhost,127.0.0.1')
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME and RENDER_EXTERNAL_HOSTNAME not in ALLOWED_HOSTS:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition
# Important: 'unfold' must come before 'django.contrib.admin'
INSTALLED_APPS = [
    'unfold',
    'unfold.contrib.filters',
    'unfold.contrib.forms',
    'unfold.contrib.inlines',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',

    # Third party packages
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'simple_history',
    'import_export',

    # Local application
    'portfolio.apps.PortfolioConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# Default to SQLite, override with DATABASE_URL if present
DATABASES = {
    'default': dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# Static & Media Files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static'] if (BASE_DIR / 'static').exists() else []

if not DEBUG:
    STORAGES = {
        'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
        'staticfiles': {
            'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
        },
    }

MEDIA_URL = '/media/'
MEDIA_ROOT = Path(os.environ.get('MEDIA_ROOT', str(BASE_DIR / 'media')))

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_PAGINATION_CLASS': None,  # Bundle and endpoints handle pagination or direct lists
}

# SimpleJWT configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# Cross-origin requests are limited to explicitly configured frontends.
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = env_list(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173',
)
CORS_ALLOW_CREDENTIALS = False

CSRF_TRUSTED_ORIGINS = env_list(
    'CSRF_TRUSTED_ORIGINS',
    'http://localhost:5173,http://127.0.0.1:5173,http://localhost:8000,http://127.0.0.1:8000',
)

# Forwarded headers when proxied through tunnels (VS Code Dev Tunnels, ngrok, reverse proxies)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
USE_X_FORWARDED_HOST = True
USE_X_FORWARDED_PORT = True

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000

# Render's free service blocks common SMTP ports. Keep email in console until
# an HTTPS email API or an SMTP provider reachable from the service is configured.
EMAIL_BACKEND = os.environ.get(
    'DJANGO_EMAIL_BACKEND',
    'django.core.mail.backends.console.EmailBackend',
)
EMAIL_HOST = os.environ.get('EMAIL_HOST', '')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', '587'))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True').lower() in ('true', '1', 'yes')
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'webmaster@localhost')

# Django Unfold Configuration (Tailwind Modern Admin UI)
UNFOLD = {
    "SITE_TITLE": "Dr. Musheer Ahmad — Lab CMS",
    "SITE_HEADER": "Dr. Musheer Ahmad Research Lab",
    "SITE_SUBHEADER": "Jamia Millia Islamia • Cryptography & Multimedia Security",
    "SITE_SYMBOL": "shield",  # Material symbol
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "THEME": "dark",
    "COLORS": {
        "primary": {
            "50": "240 249 255",
            "100": "224 242 254",
            "200": "186 230 253",
            "300": "125 211 252",
            "400": "56 189 248",
            "500": "14 165 233",
            "600": "2 132 199",
            "700": "3 105 161",
            "800": "7 89 133",
            "900": "12 74 110",
            "950": "8 47 73",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Editorial Content",
                "separator": True,
                "items": [
                    {
                        "title": "Home page",
                        "icon": "home",
                        "link": "/cms-admin/portfolio/homepage/1/change/",
                    },
                    {
                        "title": "Research",
                        "icon": "biotech",
                        "link": "/cms-admin/portfolio/researchtheme/",
                    },
                    {
                        "title": "Publications",
                        "icon": "menu_book",
                        "link": "/cms-admin/portfolio/publication/",
                    },
                    {
                        "title": "Honors & Awards",
                        "icon": "military_tech",
                        "link": "/cms-admin/portfolio/honor/",
                    },
                    {
                        "title": "Editorial Roles",
                        "icon": "edit_note",
                        "link": "/cms-admin/portfolio/editorialrole/",
                    },
                    {
                        "title": "Service & Leadership",
                        "icon": "handshake",
                        "link": "/cms-admin/portfolio/serviceitem/",
                    },
                    {
                        "title": "News",
                        "icon": "campaign",
                        "link": "/cms-admin/portfolio/newsitem/",
                    },
                ],
            },
            {
                "title": "Lab & Academics",
                "separator": True,
                "items": [
                    {
                        "title": "People",
                        "icon": "groups",
                        "link": "/cms-admin/portfolio/teammember/",
                    },
                    {
                        "title": "Teaching",
                        "icon": "school",
                        "link": "/cms-admin/portfolio/course/",
                    },
                    {
                        "title": "Recruitment",
                        "icon": "work",
                        "link": "/cms-admin/portfolio/researchopening/",
                    },
                    {
                        "title": "Applications",
                        "icon": "inbox",
                        "link": "/cms-admin/portfolio/prospectiveapplication/",
                    },
                ],
            },
            {
                "title": "Configuration",
                "separator": True,
                "items": [
                    {
                        "title": "Site settings",
                        "icon": "settings",
                        "link": "/cms-admin/portfolio/sitesettings/1/change/",
                    },
                    {
                        "title": "Navigation links",
                        "icon": "link",
                        "link": "/cms-admin/portfolio/navigationitem/",
                    },
                ],
            },
        ],
    },
}
