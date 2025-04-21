import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RestaurantDetail() {
    const { businessId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:8000/api/merged_restaurants/${businessId}/`)
        .then(response => response.json())
        .then(data => {
            setRestaurant(data);
            console.log(restaurant); // Add this line
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching restaurant:', error);
            setIsLoading(false);
        });
}, [businessId]);
    if (isLoading) {
        return <div>Loading Restaurant Details...</div>;
    }

    if (!restaurant) {
        return <div>Restaurant not found.</div>;
    }
return (
    <div>
        {console.log(restaurant.restaurant_name)}
        {console.log(restaurant.categories)}
        {console.log(restaurant.rating)}
        {console.log(restaurant.review_count)}
        {console.log(restaurant.recommendation_user_id)}
        <h1>{restaurant.restaurant_name}</h1>
        <p>Categories: {restaurant.categories}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>Review Count: {restaurant.review_count}</p>
        <p>Recommendation User ID: {restaurant.recommendation_user_id}</p>
    </div>
);
}

export default RestaurantDetail;
