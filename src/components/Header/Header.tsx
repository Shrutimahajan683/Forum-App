import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth.tsx';
import './header.css';
import { APP_TITLE } from '../../utils/constants.tsx';

export default function Header() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="app-header">
      <div className="logo-container" onClick={() => navigate('/')}>
        <div className="logo-circle"></div>
        <span className="logo-text">{APP_TITLE}</span>
      </div>

      <div className="auth-button">
        {loggedIn ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <Link to="/signin" className="login-link">Login</Link>
        )}
      </div>
    </header>
  );
}
