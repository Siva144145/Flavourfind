import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("➡️ Submitting login:", email, password);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log("📦 Response:", data);

      if (!response.ok) {
        setError(data.non_field_errors?.[0] || "Login failed. Check credentials.");
        return;
      }

      localStorage.setItem('token', data.key);
      onLogin(); // callback after login
    } catch (err) {
      console.error("❌ Login exception:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="login-box">
      <h2>Login to FlavorFind</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}

export default Login;

