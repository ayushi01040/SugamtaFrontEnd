import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem('token');

  // If no token exists, redirect to the login page immediately.
  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    // Decode the token to get the user's payload.
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload.roleid;

    // Check if the user's role matches the required role for the route.
    if (userRole === requiredRole) {
      return <Outlet />; // If the role matches, render the intended component.
    } else {
      // If the token is valid but the role doesn't match, redirect to the unauthorized page.
      return <Navigate to="/unauthorized" />;
    }
  } catch (err) {
    // If the token is invalid (e.g., malformed, expired), remove it and redirect to login.
    console.error("Invalid token:", err);
    localStorage.removeItem('token');
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;