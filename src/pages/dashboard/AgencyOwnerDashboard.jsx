// src/pages/dashboard/AgencyOwnerDashboard.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../../components/shared/Header.jsx'; // Assuming a generic Header component

export default function AgencyOwnerDashboard() {
  const location = useLocation();
  const nav = useNavigate();
  // Destructure isSuperAdmin from location.state, defaulting to false
  const { clientName, isSuperAdmin } = location.state || { isSuperAdmin: false };

  const handleAdminClick = () => {
    nav("/agency-admin/dashboard"); // Navigate to the dedicated admin dashboard route
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <Header title="Agency Owner Dashboard" />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {clientName || "Agency Owner"}!
        </h1>
        <p className="text-gray-600 mb-6">
          This is your primary dashboard where you can manage your agency's operations and clients.
        </p>

        {/* Conditionally render the Admin Dashboard button */}
        {isSuperAdmin && (
          <button
            onClick={handleAdminClick}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.078 2.292a.75.75 0 0 1 .844 0l9.75 5.25a.75.75 0 0 1 0 1.316l-9.75 5.25a.75.75 0 0 1-.844 0l-9.75-5.25a.75.75 0 0 1 0-1.316l9.75-5.25ZM12 8.647 3.455 3.972 12 1.341l8.545 2.631L12 8.647Zm0 13.076 9.75-5.25a.75.75 0 0 0 0-1.316L12 11.147l-8.545 4.595 8.545 4.596ZM12 16.647l-8.545-4.595 8.545-4.596 8.545 4.596L12 16.647Z" />
            </svg>
            <span>Go to Admin Dashboard</span>
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Agency Overview</h2>
          <p className="text-gray-600">
            {/* Placeholder for agency-specific content */}
            Here you will see a summary of your agency's performance, client acquisition, and plan management.
          </p>
          {/* You might use an <Outlet /> here if the AO Dashboard also has nested routes */}
        </div>
      </div>
    </div>
  );
}