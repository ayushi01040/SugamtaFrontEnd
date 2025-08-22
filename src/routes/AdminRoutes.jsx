import { Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/Admin/DashboardLayout";
import AdminDashboard from "@/pages/dashboard/Admin/Dashboard";
import ManageClients from "@/pages/dashboard/Admin/ManageClients";

function Placeholder({ title }) {
  return <div className="text-slate-600">{title} — coming soon</div>;
}

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "clients", element: <ManageClients /> },
    { path: "services", element: <Placeholder title="Services" /> },
    { path: "profile", element: <Placeholder title="Profile" /> },
    { path: "logout", element: <Placeholder title="Logged out" /> },
  ],
};

export default adminRoutes;
