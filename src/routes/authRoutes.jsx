// src/routes/authRoute.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Import your page components
import AuthPage from "../pages/auth/AuthPage.jsx";
// AgencyOwnerDashboard will be created/updated to display the Admin button
import AgencyOwnerDashboard from "../pages/dashboard/AgencyOwnerDashboard.jsx";
import DashboardLayout from "../pages/dashboard/AgencyClients/Dashboard.jsx"; // This is for Agency Clients
import ProtectedRoute from "../pages/auth/ProtectedRoute.auth.jsx";
import Unauthorized from "../components/shared/Unauthorized.jsx";
import NotFound from "../components/shared/NotFound.jsx";

// Import the newly created dashboard pages for Agency Clients
import MyProfilePage from "../pages/dashboard/AgencyClients/MyProfilePage.jsx";
import MyPlansPage from "../pages/dashboard/AgencyClients/MyPlansPage.jsx";
import MyAgencyDetailsPage from "../pages/dashboard/AgencyClients/MyAgencyDetailsPage.jsx";
import SecondaryClientsPage from "../pages/dashboard/AgencyClients/SecondaryClientsPage.jsx";

// Import Admin Dashboard components from the new structure
import AdminDashboardLayout from "../pages/dashboard/Admin/Dashboard.jsx"; // This is the wrapper layout for Admin
import AdminOverviewPage from "../pages/dashboard/Admin/AdminOverviewPage.jsx"; // The original Dashboard.jsx content
import ManageClientsPage from "../pages/dashboard/Admin/ManageClientsPage.jsx"; // The original ManageClients.jsx content


const AuthRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes for Login and Registration */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Unauthorized page for specific role access denials */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Route for Agency Owner & initial landing for Admin */}
        {/* Both AO and ADMIN can access /agency-dashboard */}
        <Route element={<ProtectedRoute requiredRoles={["AO", "ADMIN"]} />}>
          <Route path="/agency-dashboard" element={<AgencyOwnerDashboard />} />
        </Route>

        {/* Dedicated Protected Routes for Agency Admin Dashboard */}
        {/* Only ADMIN role can access /agency-admin/dashboard and its nested routes */}
        <Route element={<ProtectedRoute requiredRoles={["ADMIN"]} />}>
          <Route path="/agency-admin/dashboard" element={<AdminDashboardLayout />}>
            {/* Nested routes for Admin specific pages */}
            <Route index element={<AdminOverviewPage />} /> {/* Default child route for /agency-admin/dashboard */}
            <Route path="overview" element={<AdminOverviewPage />} />
            <Route path="manage-clients" element={<ManageClientsPage />} />
            {/* Add more admin-specific nested routes here as needed */}
          </Route>
        </Route>

        {/* Protected Routes for Agency Client */}
        <Route element={<ProtectedRoute requiredRoles={["AC"]} />}>
          <Route path="/agency-client/dashboard" element={<DashboardLayout />}>
            {/* Nested routes for the Agency Client Dashboard */}
            <Route index element={<MyProfilePage />} />
            <Route path="profile" element={<MyProfilePage />} />
            <Route path="plans" element={<MyPlansPage />} />
            <Route path="agency-details" element={<MyAgencyDetailsPage />} />
            <Route path="secondary-clients" element={<SecondaryClientsPage />} />
          </Route>
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