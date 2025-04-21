from django.contrib import admin
from django.urls import path, include
from restaurant.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('restaurant.urls')),  # your API endpoints
    path('', FrontendAppView.as_view()),       # ✅ root serves index.html
]

