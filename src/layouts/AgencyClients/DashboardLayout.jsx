// pages/dashboard/AgencyClient/Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/AgencyClients/Sidebar";
import Navbar from "../../../components/layout/AgencyClients/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setClientName(payload.clientName);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <Sidebar clientName={clientName} />
      <div className="flex flex-col bg-slate-50">
        <Navbar clientName={clientName} />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}