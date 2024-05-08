import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  async function handleSubmit() {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const body = JSON.stringify({username: username, password: password});
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/signup`, body, config);
      if (result.data.error) { 
        console.error("error:", result.data.error);
      } else {
        console.log('User created');
        navigate('/login');
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>Register for an account</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <label>Username</label>
        <input 
          type="text" 
          placeholder="username*" 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input 
          type="password" 
          placeholder="password*" 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}