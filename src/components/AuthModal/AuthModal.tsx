import React from 'react';
import './modal.css';
import SignIn from '../Auth/SignIn.tsx'
import ReactDOM from 'react-dom';

export default function AuthModal({ onClose }: { onClose: () => void }) {
  return (
    ReactDOM.createPortal(< div className="modal-overlay" >
      <div className="modal">
        <SignIn />
      </div>
    </div >, document.getElementById('root'))
  );
}
