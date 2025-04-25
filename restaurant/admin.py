from django.contrib import admin
from .models import CleanRestaurant  # Only import models that exist

admin.site.register(CleanRestaurant)  # Register only valid models

