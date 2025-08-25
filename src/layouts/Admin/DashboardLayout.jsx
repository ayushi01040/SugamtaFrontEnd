import Sidebar from "../../components/layout/Admin/Sidebar";
import Navbar from "../../components/layout/Admin/Navbar";
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