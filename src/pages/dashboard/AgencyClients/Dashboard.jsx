// src/pages/dashboard/AgencyClients/Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../../../components/layout/AgencyClients/Sidebar.jsx"; 
import Navbar from "../../../components/layout/AgencyClients/Navbar.jsx"; 
import { Outlet } from "react-router-dom";
import api from "../../../config/api.js";

export default function DashboardLayout() {
  const [clientName, setClientName] = useState("");
  const [clientProfile, setClientProfile] = useState(null);
  const [clientPlans, setClientPlans] = useState([]); // This will now be a combined array
  const [agencyDetails, setAgencyDetails] = useState(null);
  const [secondaryClients, setSecondaryClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setClientName(payload.clientName || payload.fullName || "");
          } catch (decodeError) {
            console.error("Failed to decode token:", decodeError);
          }
        }

        const [
          profileResponse,
          plansResponse,
          agencyDetailsResponse,
          secondaryClientsResponse,
        ] = await Promise.all([
          api.get("/agency-user/client/profile"),
          api.get("/agency-user/client/my-plans"),
          api.get("/agency-user/client/my-agency-details"),
          api.get("/agency-user/client/secondary-clients"),
        ]);
        
        setClientProfile(profileResponse.data.data);
        setAgencyDetails(agencyDetailsResponse.data.data);
        setSecondaryClients(secondaryClientsResponse.data.data);

        // Combine insurance and investment plans into one array
        const combinedPlans = [
          ...plansResponse.data.data.insurance_plans,
          ...plansResponse.data.data.investment_plans,
        ];
        setClientPlans(combinedPlans);
        
      } catch (err) {
        console.error("Failed to fetch client data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="flex items-center space-x-2 text-primary-blue">
          <svg className="animate-spin h-5 w-5 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray text-accent-red">
        <p className="text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-cols-[16rem_1fr]">
      <Sidebar 
        clientName={clientName} 
        clientProfile={clientProfile} 
        clientPlans={clientPlans}
      />
      <div className="flex flex-col bg-slate-50">
        <Navbar clientName={clientName} />
        <main className="p-4 overflow-auto">
          <Outlet context={{ clientProfile, clientPlans, agencyDetails, secondaryClients }} />
        </main>
      </div>
    </div>
  );
}