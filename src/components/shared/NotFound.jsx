// src/components/NotFound.jsx
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className-="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <button
          onClick={() => window.location.href = "/"} // Or use navigate('/') from react-router-dom if you import it
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}