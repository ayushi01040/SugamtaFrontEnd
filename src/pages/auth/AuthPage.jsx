// src/pages/auth/AuthPage.jsx
import React, { useState } from 'react';
import LoginAuth from './Login.Auth.jsx';
import RegistrationAuth from './Registration.auth.jsx';
import AuthLayout from '../../components/layout/AuthLayout.jsx';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleView = () => {
    setShowLogin(prev => !prev);
  };

  return (
    <AuthLayout showLogin={showLogin}>
      {showLogin ? (
        <LoginAuth toggleView={toggleView} />
      ) : (
        <RegistrationAuth toggleView={toggleView} />
      )}
    </AuthLayout>
  );
}
