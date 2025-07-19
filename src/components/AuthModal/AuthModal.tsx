import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_CONSTANTS } from '../../utils/constants.tsx';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{AUTH_CONSTANTS.signInAlert}</p>
        <button onClick={() => navigate('/signin')}>{AUTH_CONSTANTS.signInLabel}</button>
        <button onClick={() => navigate('/signup')}>{AUTH_CONSTANTS.signUpLabel}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
