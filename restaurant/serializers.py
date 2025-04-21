from rest_framework import serializers

class MergedRestaurantSerializer(serializers.Serializer):
    business_id = serializers.CharField()  # Use business_id here
    restaurant_name = serializers.CharField()
    categories = serializers.CharField()
    rating = serializers.FloatField()
    review_count = serializers.IntegerField()
    recommendation_user_id = serializers.CharField(allow_null=True)
