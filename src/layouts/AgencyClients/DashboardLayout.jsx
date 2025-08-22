import Sidebar from "@/components/layout/AgencyClients/Sidebar";
import Navbar from "@/components/layout/AgencyClients/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <Sidebar />
      <div className="flex flex-col bg-slate-50">
        <Navbar />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
