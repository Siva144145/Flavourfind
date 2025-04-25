from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.db import connection
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from restaurant.models import CleanRestaurant
import json


class FrontendAppView(TemplateView):
    template_name = 'index.html'


class MergedRestaurantViewSet(viewsets.ViewSet):
    def list(self, request):
        category = request.query_params.get('category')
        location = request.query_params.get('location')  # used as state now
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
                hours,
                phone,
                website,
                cuisine
            FROM clean_restaurants
            WHERE 1 = 1
        """

        params = []

        if category:
            sql_query += " AND cuisine LIKE %s"
            params.append(f"%{category}%")

        if location:
            sql_query += " AND state LIKE %s"
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
        common_cuisines = [
            'Indian', 'Mexican', 'American', 'Chinese', 'Italian',
            'Mediterranean', 'Thai', 'Japanese', 'French', 'Greek',
            'Vietnamese', 'Korean', 'Spanish', 'Turkish', 'Lebanese'
        ]

        # Filter categories that contain at least one of the common cuisine terms
        cuisine_qs = CleanRestaurant.objects.values_list('categories', flat=True).distinct()
        filtered_cuisines = set()

        for cat in cuisine_qs:
            if not cat:
                continue
            for cuisine in common_cuisines:
                if cuisine.lower() in cat.lower():
                    filtered_cuisines.add(cuisine)
        
        states = list(CleanRestaurant.objects.values_list('state', flat=True).distinct())
        return JsonResponse({'cuisines': sorted(filtered_cuisines), 'states': sorted(states)})
    
    except Exception as e:
        print(f"[DROPDOWN ERROR] {str(e)}")
        return JsonResponse({'error': 'Failed to fetch dropdown options'}, status=500)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

