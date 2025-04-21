from django.contrib import admin
from django.urls import path, include
from restaurant.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('restaurant.urls')),  # your API endpoints
    path('api/auth/', include('dj_rest_auth.urls')),  # ✅ login, logout, etc.
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # ✅ signup
    path('', FrontendAppView.as_view()),  # serves index.html
]

