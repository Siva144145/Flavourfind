from django.db import models

class CleanRestaurant(models.Model):
    business_id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20)
    categories = models.TextField()
    stars_x = models.FloatField()
    review_count = models.IntegerField()
    phone = models.CharField(max_length=20)
    attributes = models.TextField(null=True)
    hours = models.TextField(null=True)
    website = models.TextField(null=True)

    class Meta:
        managed = False  # ⚠️ Important: tells Django not to modify the table
        db_table = 'clean_restaurants'

