// src/pages/auth/ProtectedRoute.auth.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // You might need to install jwt-decode

const ProtectedRoute = ({ requiredRoles }) => {
  const token = localStorage.getItem("token");
  let userRoles = [];

  // If no token exists, redirect to the login page immediately.
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    // Decode the token to get the user's payload.
    const payload = jwtDecode(token); // Use jwtDecode
    // Assuming 'roleid' in the token payload is an array of roles
    userRoles = payload.roleid || [];
  } catch (err) {
    // If the token is invalid (e.g., malformed, expired), remove it and redirect to login.
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }

  // Check if the user's roles include any of the required roles for the route.
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

  if (hasRequiredRole) {
    return <Outlet />; // If the role matches, render the intended component.
  } else {
    // If the token is valid but no matching role, redirect to the unauthorized page.
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;