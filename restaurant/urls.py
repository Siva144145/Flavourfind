from django.urls import path, include
from .views import MergedRestaurantViewSet, dropdown_options

merged_restaurant_view = MergedRestaurantViewSet.as_view({
    'get': 'list',
})

restaurant_detail_view = MergedRestaurantViewSet.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),  # ✅ Login, logout
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # ✅ Register
    path('merged_restaurants/', merged_restaurant_view, name='merged_restaurants'),
    path('merged_restaurants/<str:pk>/', restaurant_detail_view, name='restaurant_detail'),
    path('dropdown_options/', dropdown_options, name='dropdown_options'),
]

