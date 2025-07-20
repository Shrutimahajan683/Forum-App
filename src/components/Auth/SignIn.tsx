import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../utils/auth.tsx';
import './auth.css';
import SignInIcon from '../../assets/icons/signin_icon.svg'
import { AUTH_CONSTANTS } from '../../utils/constants.tsx';

export default function SignIn({ onSubmit }: { onSubmit?: () => void }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
      window.location.reload();
    }
    if (login(email, password)) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-panel">
        <div className="auth-header">
          <div className="auth-icon">
            <img src={SignInIcon} alt="SignIn Icon" className="signin-icon" />
          </div>
          <h2>{AUTH_CONSTANTS.signInToContinueLable}</h2>
          <p>{AUTH_CONSTANTS.SignInToAccessAllFeaturesAppLable}</p>
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
      </div>
      <p className="auth-toggle">
        {AUTH_CONSTANTS.DoNotHaveAccountLable} <Link to="/signup">{AUTH_CONSTANTS.signUpLabel}</Link>
      </p>
    </div>
  );
}
