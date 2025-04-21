import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('https://flavourfind.onrender.com/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.key);
    onLogin(); // redirect or set logged in state
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please check your credentials.');
  }
};

  return (
    <div className="login-box">
      <h2>Login to FlavorFind</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

