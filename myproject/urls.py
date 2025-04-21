from django.contrib import admin
from django.urls import path, include
from restaurant.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Your app endpoints
    path('api/', include('restaurant.urls')),

    # Auth endpoints from dj-rest-auth
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),

    # React frontend loader
    path('', FrontendAppView.as_view()),
]

