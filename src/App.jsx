import { Routes, Route } from "react-router-dom";

// Import your page components
// import { ToastContainer } from "react-toastify";
// import AuthLogin from "../src/pages/auth/Login.Auth";
// import RegistrationAuth from "../src/pages/auth/Registration.auth";
// import AgencyOwnerDashboard from "../src/pages/dashboard/AgencyOwnerDashboard";
// import AgencyClientDashboard from "../src/pages/dashboard/AgencyClientDashboard";
// import ProtectedRoute from "../src/pages/auth/ProtectedRoute.auth";
// import Unauthorized from "../src/components/shared/Unauthorized";
// import NotFound from "../src/components/shared/NotFound";
import AuthRoutes from "./routes/authRoutes";

const App = () => {
  return (
    <>
      <AuthRoutes />
    </>
  );
};

export default App;
