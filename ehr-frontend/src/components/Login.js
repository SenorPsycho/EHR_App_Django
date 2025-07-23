// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('http://127.0.0.1:8000/api/token/', {
  //       username,
  //       password,
  //     });
  //     localStorage.setItem('access_token', res.data.access);
  //     localStorage.setItem('refresh_token', res.data.refresh);
  //     navigate('/dashboard');
  //   } catch (err) {
  //     alert('Login failed. Check credentials.');
  //   }
  // };

  
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/token/',
      { username: username.trim(), password },
      { headers: { 'Content-Type': 'application/json' } }
    );


const token = localStorage.getItem('access_token');
if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log(payload.username, payload.role);
} else {
  console.warn("No access token found");
}


    
  console.log('✅ Login success:', res.data); // Debug log
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    navigate('/dashboard');
  } catch (err) {
    console.error('❌ Login failed:', err); // ← this will show the true error
    alert('Login failed. Check credentials.');
  }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


