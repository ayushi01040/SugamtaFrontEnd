// src/routes/authRoute.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import your page components
import AuthPage from "../pages/auth/AuthPage.jsx";
import AgencyOwnerDashboard from "../pages/dashboard/AgencyOwnerDashboard.jsx";
import AgencyClientDashboard from "../pages/dashboard/AgencyClientDashboard.jsx";
import ProtectedRoute from "../pages/auth/ProtectedRoute.Auth.jsx";
import Unauthorized from "../components/shared/Unauthorized.jsx";
import NotFound from "../components/shared/NotFound.jsx";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes for Login and Registration, both pointing to AuthPage */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Unauthorized page for specific role access denials */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes for Agency Owner */}
        <Route element={<ProtectedRoute requiredRole="AO" />}>
          <Route path="/agency-dashboard" element={<AgencyOwnerDashboard />} />
        </Route>

        {/* Protected Routes for Agency Client */}
        <Route element={<ProtectedRoute requiredRole="AC" />}>
          <Route path="/agency-client" element={<AgencyClientDashboard />} />
        </Route>

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast container should be outside Routes */}
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
};

export default AuthRoutes;
