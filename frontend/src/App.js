import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Context } from './context/authContext';
import { useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const { state } = useContext(Context)
  const { loggedIn } = state;

  useEffect(() => {
    console.log('useEffect triggered in App.js');
    if (loggedIn) {
      console.log('logged in');
      navigate('/');
    } else {
      console.log('not logged in');
      navigate('/login');
    }
  }, [loggedIn, navigate]);
  return (
      <Routes>
        <Route 
          path="/" 
          exact element={
          <Layout>
            <Dashboard />
          </Layout>} 
        />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}