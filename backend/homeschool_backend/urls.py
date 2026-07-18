from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # SimpleJWT Auth
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App Routing
    path('api/users/', include('users.urls')),
    path('api/assessments/', include('assessments.urls')),
    path('api/curriculum/', include('curriculum.urls')),
    path('api/lms/', include('lms.urls')),
    path('api/islamic-studies/', include('islamic_studies.urls')),
    path('api/skills-future/', include('skills_future.urls')),
    path('api/exams/', include('smart_exams.urls')),
    path('api/attendance/', include('attendance_diary.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/chat/', include('chat.urls')),

    # OpenAPI Schema / Swagger UI / Redoc
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
