import React, { useState } from 'react';

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
const [password1, setPassword1] = useState('');
const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
const response = await fetch('https://flavourfind.onrender.com/api/auth/registration/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password1, password2, username })
});

    if (response.ok) {
      alert('Signup successful! Please log in.');
      onSignup();  // maybe redirect to login
    } else {
      alert('Signup failed!');
    }
  };

  return (
    <div className="signup-container">
      <h2>Register for FlavorFind</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Gmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
<input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
<button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;

