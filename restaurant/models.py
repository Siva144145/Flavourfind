from django.db import models

class Business(models.Model):
    business_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=255)

class Category(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=255)

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    address = models.CharField(max_length=300)
