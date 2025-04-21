import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Trying login with", email, password);
      const response = await fetch('https://flavourfind.onrender.com/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }) // ✅ dj_rest_auth expects email & password only
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Login failed:", error);
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.key);
      onLogin(); // ✅ callback after login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
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
    </div>
  );
}

export default Login;

