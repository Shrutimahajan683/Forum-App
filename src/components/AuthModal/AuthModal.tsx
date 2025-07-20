import React from 'react';
import './modal.css';
import SignIn from '../Auth/SignIn.tsx'
import ReactDOM from 'react-dom';

export default function AuthModal({ onSubmit }: { onSubmit: () => void }) {
  return (
    ReactDOM.createPortal(< div className="modal-overlay" >
      <div className="modal">
        <SignIn onSubmit={onSubmit} />
      </div>
    </div >, document.getElementById('root'))
  );
}
