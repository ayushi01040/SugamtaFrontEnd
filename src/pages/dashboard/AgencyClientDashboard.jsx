import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardUI from "../../components/ui/DashBoardUI"; // Correct the path

const AgencyClientDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const payload = JSON.parse(atob(token.split(".")[1]));
  const roleId = payload.roleid;
  const clientName = payload.clientName;

  console.log(payload);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <DashboardUI
      title="Client Dashboard"
      clientName={clientName}
      roleId={roleId}
      handleLogout={handleLogout}
      message="This is your personalized dashboard view as an Agency Client."
    />
  );
};

export default AgencyClientDashboard;
