import React from 'react';
import AuthenticationPage from './AuthenticationPage';

/**
 * AuthModal wrapping the Figma Frame 50:37373 Noesis · Authentication screen.
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#FFFFFF',
        overflowY: 'auto'
      }}
    >
      <AuthenticationPage
        onBack={onClose}
        onLoginSuccess={(user) => {
          onLoginSuccess(user);
          onClose();
        }}
      />
    </div>
  );
}
