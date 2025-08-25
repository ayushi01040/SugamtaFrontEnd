// src/pages/dashboard/Admin/Dashboard.jsx

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from '../../../components/shared/Header.jsx'; // Generic Header component

export default function AdminDashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-400">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            to="/agency-admin/dashboard/overview"
            className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
              location.pathname === "/agency-admin/dashboard" || location.pathname === "/agency-admin/dashboard/overview"
                ? "bg-indigo-700 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Dashboard Overview
          </Link>
          <Link
            to="/agency-admin/dashboard/manage-clients"
            className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
              location.pathname === "/agency-admin/dashboard/manage-clients"
                ? "bg-indigo-700 text-white font-semibold"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Manage Clients
          </Link>
          {/* Add more admin navigation links here */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Admin Header (optional, can be part of layout) */}
        {/* <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <Header title="Admin Section" />
        </div> */}

        {/* Render nested admin pages */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}