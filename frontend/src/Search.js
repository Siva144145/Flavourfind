import React, { useState } from 'react';

function Search({ cities, cuisines }) {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const url = `http://127.0.0.1:8000/api/merged_restaurants/?category=${selectedCuisine}&location=${selectedCity}`;
    fetch(url)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Search error:", err));
  };

  return (
    <div>
      <h2>Hola Gourmet! 🍽️</h2>
      <select onChange={(e) => setSelectedCuisine(e.target.value)} value={selectedCuisine}>
        <option>Choose Cuisine</option>
        {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
        <option>Choose City</option>
        {cities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <button onClick={handleSearch}>Find Restaurants</button>

      <div>
        {results.map((r, i) => (
          <div key={i} style={{ padding: '10px', border: '1px solid gray', margin: '10px' }}>
            <strong>{r.restaurant_name}</strong>
            <p>Categories: {r.categories}</p>
            <p>Rating: {r.rating}</p>
            <p>Review Count: {r.review_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

