// src/components/layout/AgencyClients/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for active link styling
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaUsers } from 'react-icons/fa'; // Example icons from react-icons/fa

export default function Sidebar({ clientName, clientProfile }) {
  const location = useLocation(); // Hook to get current path
  const displayName = clientProfile?.fullName || clientName || "Client"; // Use full name from profile, then clientName, then default
  const firstLetter = displayName.charAt(0).toUpperCase();

  const navLinks = [
    { path: "/agency-client/dashboard", name: "Dashboard", icon: FaHome },
    { path: "/agency-client/dashboard/profile", name: "My Profile", icon: FaUser },
    { path: "/agency-client/dashboard/plans", name: "My Plans", icon: FaFileAlt },
    { path: "/agency-client/dashboard/agency-details", name: "My Agency", icon: FaBriefcase },
    { path: "/agency-client/dashboard/secondary-clients", name: "Secondary Clients", icon: FaUsers },
  ];

  return (
    <aside className="p-4 bg-white shadow-lg flex flex-col items-center space-y-6 border-r border-gray-100">
      {/* Client Avatar and Name */}
      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="w-16 h-16 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-2xl shadow-md">
          {firstLetter}
        </div>
        <span className="font-semibold text-lg text-text-dark-gray">{displayName}</span>
      </div>

      {/* Navigation Links */}
      <nav className="w-full">
        <ul className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 
                    ${isActive 
                      ? "bg-primary-blue text-white shadow-md" 
                      : "text-text-dark-gray hover:bg-light-gray hover:text-primary-blue"
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
          {/* Add a logout button here later if needed */}
        </ul>
      </nav>
    </aside>
  );
}
