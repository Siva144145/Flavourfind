from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
import json

class FrontendAppView(TemplateView):
    template_name = 'index.html'

class MergedRestaurantViewSet(viewsets.ViewSet):
    def list(self, request):
        category = request.query_params.get('category')
        location = request.query_params.get('location')
        sort_by = request.query_params.get('sort_by')

        sql_query = """
            SELECT
                business_id,
                name AS restaurant_name,
                address,
                city,
                state,
                postal_code,
                categories,
                stars_x AS rating,
                review_count,
                phone,
                CASE 
                    WHEN JSON_VALID(attributes) AND JSON_EXTRACT(attributes, '$.RestaurantsPriceRange2') IS NOT NULL 
                    THEN JSON_UNQUOTE(JSON_EXTRACT(attributes, '$.RestaurantsPriceRange2')) 
                    ELSE NULL 
                END AS price_range,
                hours,
                website
            FROM clean_restaurants
            WHERE 1 = 1
        """

        params = []

        if category:
            sql_query += " AND cuisine LIKE %s"
            params.append(f"%{category}%")

        if location:
            sql_query += " AND city LIKE %s"
            params.append(f"%{location}%")

        if sort_by == 'rating':
            sql_query += " ORDER BY rating DESC"
        elif sort_by == 'review_count':
            sql_query += " ORDER BY review_count DESC"

        with connection.cursor() as cursor:
            cursor.execute(sql_query, params)
            results = cursor.fetchall()

            if cursor.description:
                columns = [col[0] for col in cursor.description]
                data = [dict(zip(columns, row)) for row in results]
            else:
                data = []

        return Response(data)

@api_view(['GET'])
def dropdown_options(request):
    try:
        cuisines = list(Restaurant.objects.values_list('category', flat=True).distinct())
        cities = list(Restaurant.objects.values_list('location', flat=True).distinct())
        return JsonResponse({'cuisines': cuisines, 'cities': cities})
    except Exception as e:
        print(f"[DROPDOWN ERROR] {str(e)}")  # check this in Render logs
        return JsonResponse({'error': 'Failed to fetch dropdown options'}, status=500)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return JsonResponse({'message': 'User registered successfully'}, status=201)

    return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['POST'])
def register(request):
    # Temporary placeholder response
    return Response({"message": "User registered (placeholder)"})
