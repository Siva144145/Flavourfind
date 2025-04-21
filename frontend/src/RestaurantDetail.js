import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantDetail() {
  const { businessId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!businessId) return;

    fetch(`http://127.0.0.1:8000/api/merged_restaurants/${businessId}/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch details");
        return res.json();
      })
      .then(data => {
        setRestaurant(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [businessId]);

  if (isLoading) return <div>Loading...</div>;
  if (!restaurant) return <div>Restaurant not found.</div>;

  return (
    <div className="restaurant-detail-card">
      <h1>{restaurant.restaurant_name}</h1>
      <p><strong>Categories:</strong> {restaurant.categories}</p>
      <p><strong>Rating:</strong> {restaurant.rating}</p>
      <p><strong>Review Count:</strong> {restaurant.review_count}</p>
      <p><strong>Recommended User:</strong> {restaurant.recommendation_user_id || 'N/A'}</p>
      <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>← Back</Link>
    </div>
  );
}

export default RestaurantDetail;

