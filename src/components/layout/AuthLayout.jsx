// src/components/shared/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ children, showLogin }) => {
  const loginImage = "https://placehold.co/600x800/E0F2F7/000000?text=Welcome+Back!";
  const registerImage = "https://placehold.co/600x800/D1F2F7/000000?text=Join+Sugamta!"; // Changed background color for better contrast

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 -scroll-ms-0">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Left Section: Toggling Image */}
        <div className="hidden lg:flex items-center justify-center w-1/2 p-8 bg-gradient-to-br from-blue-500 to-indigo-600">
          <img
            src={showLogin ? loginImage : registerImage}
            alt={showLogin ? "Login Illustration" : "Registration Illustration"}
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Right Section: Form Container - Enforce consistent height here */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          {/* Added scrollbar-hide to hide the scrollbar */}
          <div className="max-w-xl w-full h-[600px] overflow-y-auto scrollbar-hide">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
