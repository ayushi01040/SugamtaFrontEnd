import { useRoutes, Navigate } from "react-router-dom";
import adminRoutes from "./routes/AgencyClients";
import clientRoutes from "./routes/AdminRoutes";

export default function App() {
  const routes = [
    { path: "/", element: <Navigate to="/admin/dashboard" replace /> },
    adminRoutes,
    clientRoutes,
    { path: "*", element: <div className="p-6">Not Found</div> },
  ];

  const element = useRoutes(routes);
  return element;
}
