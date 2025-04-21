import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import RestaurantDetail from './RestaurantDetail';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        setIsLoading(true); // Set loading to true before fetching
        fetch(`http://127.0.0.1:8000/api/merged_restaurants/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                setRestaurants(data);
                setIsLoading(false); // Set loading to false after fetching
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false); // Set loading to false on error
            });
    }, []);

    if (isLoading) {
        return <div>Loading Restaurants...</div>; // Loading message for initial fetch
    }

    return (
        <div className="app-container">
            <div className="restaurant-list">
                {restaurants.map(restaurant => (
                    <div key={restaurant.business_id} className="restaurant-card">
                        <h2>{restaurant.restaurant_name}</h2>
                        <p>Categories: {restaurant.categories}</p>
                        <p>Rating: {restaurant.rating}</p>
                        <Link to={`/restaurant/${restaurant.business_id}`}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            <Routes>
                <Route path="/restaurant/:businessId" element={<RestaurantDetail />} />
            </Routes>
        </div>
    );
}

export default App;
