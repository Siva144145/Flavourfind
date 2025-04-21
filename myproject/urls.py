from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('restaurant.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    re_path(r'^.*$', TemplateView.as_view(template_name="index.html")),
]

urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'frontend/build/static'))

