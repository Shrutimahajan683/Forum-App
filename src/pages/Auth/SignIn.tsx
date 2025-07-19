import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../utils/auth.tsx';
import './auth.css';
import SignInIcon from '../../assets/icons/signin_icon.svg'
import { AUTH_CONSTANTS } from '../../utils/constants.tsx';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="auth-icon">
          <img src={SignInIcon} alt="SignIn Icon" className="signin-icon" />
        </div>
        <h2>Sign in to continue</h2>
        <p>Sign in to access all the features on this app</p>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Enter your email or username"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{AUTH_CONSTANTS.signInButtonLabel}</button>
      </form>

      <p className="auth-toggle">
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
