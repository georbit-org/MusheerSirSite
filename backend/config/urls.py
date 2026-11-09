"""
URL configuration for Dr. Musheer Ahmad Portfolio & Lab project.
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.generic import RedirectView
from django.views.static import serve as serve_public_media
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from portfolio.views import robots_txt, sitemap_xml


def health_check(request):
    from django.db import connection

    with connection.cursor() as cursor:
        cursor.execute('SELECT 1')
    return JsonResponse({'status': 'ok'})

urlpatterns = [
    path('healthz', health_check, name='health-check'),
    # Search Engine Feeds & Discovery
    path('robots.txt', robots_txt, name='robots_txt'),
    path('sitemap.xml', sitemap_xml, name='sitemap_xml'),

    # Modern django-unfold CMS Admin
    path('cms-admin/', admin.site.urls),
    path('admin/', RedirectView.as_view(url='/cms-admin/', permanent=False)),

    # JWT Authentication Endpoints (for front-end professor dashboard)
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Portfolio API
    path('api/v1/', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # Serve public CMS media on the free tier's ephemeral filesystem. Keep
    # application CV uploads out of public URLs.
    urlpatterns += [
        re_path(
            r'^media/(?P<path>(?:portraits|cv|seo|team)/.*)$',
            serve_public_media,
            {'document_root': settings.MEDIA_ROOT},
        ),
    ]
