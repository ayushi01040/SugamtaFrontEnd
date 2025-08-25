// src/components/shared/AuthLayout.jsx
import React from 'react';
// Reinstated direct image imports as per your file structure
import loginImage from '../../assets/signIn.jpg';
import registerImage from '../../assets/registerUser.jpg';

const AuthLayout = ({ children, showLogin }) => {
  // Using imported image variables directly
  const currentImagePath = showLogin ? loginImage : registerImage;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 -scroll-ms-0">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Left Section: Toggling Image */}
        <div className="hidden lg:flex items-center justify-center w-1/2 p-8 bg-gradient-to-br from-primary-blue to-blue-800 rounded-l-lg"> {/* Using primary-blue from your config */}
          <img
            src={currentImagePath}
            alt={showLogin ? "Login Illustration" : "Registration Illustration"}
            className="max-w-full h-auto rounded-lg shadow-md"
            // Add an onerror fallback in case the image path is still incorrect
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x800/E0F2F7/000000?text=Image+Not+Found"; }}
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
