import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password1 !== password2) {
      setError("Passwords do not match!");
      return;
    }

    try {
      console.log("Trying registration with", email, password1);
      const response = await fetch('http://127.0.0.1:8000/api/auth/registration/'
    , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password1, password2 })
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Registration failed:", err);
        setError(JSON.stringify(err));
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.key);
      onRegister(); // redirect or callback
    } catch (err) {
      console.error("Something went wrong:", err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>Create New Account</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
      <button onClick={handleRegister}>Create Account</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;

