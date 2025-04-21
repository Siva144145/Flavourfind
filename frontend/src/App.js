import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisine, setCuisine] = useState('');
  const [city, setCity] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [cities, setCities] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

useEffect(() => {
  fetch('https://flavourfind.onrender.com/api/dropdown_options/')
    .then((response) => response.json())
    .then((data) => {
      setCuisines(data.cuisines || []);
      setCities(data.cities || []);
    });
}, []);


  const handleSearch = () => {
    const query = new URLSearchParams({
      category: cuisine,
      location: city,
      sort_by: sortBy
    }).toString();

       fetch('https://flavourfind.onrender.com/api/dropdown_options/')
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  };

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <div className="header">
            <h1>FlavorFind 🔍</h1>
            <p>Discover restaurants that suit your taste</p>

            <div className="filters">
              <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                <option value="">Choose Cuisine</option>
                {cuisines.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Choose City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="rating">Review Rating</option>
                <option value="review_count">Review Count</option>
              </select>

              <button onClick={handleSearch}>Find Restaurants</button>
            </div>
          </div>

          <div className="restaurant-container">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div className="restaurant-card" key={restaurant.business_id}>
                  <h2>{restaurant.restaurant_name}</h2>
                  <p><strong>Categories:</strong> {restaurant.categories}</p>
                  <p><strong>Rating:</strong> ✨ {restaurant.rating}</p>
                  <p><strong>Review Count:</strong> {restaurant.review_count}</p>
                  <p><strong>Address:</strong> {restaurant.address}</p>
                  <p><strong>Phone:</strong> 📞 {restaurant.phone}</p>
                  <p><strong>Hours:</strong> 🕓 {restaurant.hours}</p>
                  <p><strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></p>
                </div>
              ))
            ) : (
              <p className="no-data">🔍 No restaurants to display.</p>
            )}
          </div>
        </>
      ) : (
        showRegister ? (
          <>
            <Register onRegister={() => setLoggedIn(true)} />
            <p style={{ marginTop: '10px' }}>
              Already have an account? <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={() => setLoggedIn(true)} />
            <p style={{ marginTop: '10px' }}>
              Don’t have an account? <button onClick={() => setShowRegister(true)}>Sign up</button>
            </p>
          </>
        )
      )}
    </div>
  );
}

export default App;

