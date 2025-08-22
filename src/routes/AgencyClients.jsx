import ClientLayout from "@/layouts/AgencyClients/DashboardLayout";
import ClientDashboard from "@/pages/dashboard/AgencyClients/Dashboard";

const clientRoutes = {
  path: "/client",
  element: <ClientLayout />,
  children: [
    { index: true, element: <ClientDashboard /> },
    // later add: { path: "projects", element: <Projects /> }
  ],
};

export default clientRoutes;
