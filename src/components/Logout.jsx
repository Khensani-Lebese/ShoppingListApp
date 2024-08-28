// src/components/Logout.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');

    if (window.confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('user');
        navigate('/login');
      }
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyle}>
      Logout
    </button>
  );
};

export default Logout;

const logoutButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
};
