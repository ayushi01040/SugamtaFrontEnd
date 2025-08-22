import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Header from '../../../components/layout/Header';
import StatsCard from '../../../components/shared/StatsCard';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { getClients } from '../../../services/clientService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    verifiedClients: 0,
    newThisMonth: 0
  });
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const extractClientsArray = (responseData) => {
    console.log('Raw response data for extraction:', responseData);
    
    // If it's already an array, return it
    if (Array.isArray(responseData)) {
      return responseData;
    }
    
    // If it's an object, look for any array property that might contain clients
    if (responseData && typeof responseData === 'object') {
      const possibleArrayKeys = [
        'data', 'clients', 'items', 'results', 'users', 
        'records', 'list', 'array', 'content'
      ];
      
      // First check common keys
      for (const key of possibleArrayKeys) {
        if (Array.isArray(responseData[key])) {
          console.log(`Found clients array in key: ${key}`);
          return responseData[key];
        }
      }
      
      // Then check any other array properties
      const allArrayKeys = Object.keys(responseData).filter(key => 
        Array.isArray(responseData[key])
      );
      
      if (allArrayKeys.length > 0) {
        console.log(`Found arrays in keys: ${allArrayKeys.join(', ')}`);
        return responseData[allArrayKeys[0]];
      }
    }
    
    console.warn('No clients array found in response');
    return [];
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getClients();
      console.log('Full API Response:', response);
      
      const clientsArray = extractClientsArray(response);
      console.log('Extracted clients array:', clientsArray);
      console.log('Number of clients extracted:', clientsArray.length);
      
      setClients(clientsArray);
      calculateStats(clientsArray);
      
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (clientsData) => {
    // Ensure we're working with an array
    if (!Array.isArray(clientsData)) {
      console.error('Expected array for stats calculation, got:', typeof clientsData, clientsData);
      setStats({
        totalClients: 0,
        activeClients: 0,
        verifiedClients: 0,
        newThisMonth: 0
      });
      return;
    }

    const total = clientsData.length;
    const active = clientsData.filter(client => client.IsActive).length;
    const verified = clientsData.filter(client => client.IsVerified).length;
    
    // Simple calculation for new clients this month (15% of total as example)
    const newThisMonth = Math.round(total * 0.15);

    setStats({
      totalClients: total,
      activeClients: active,
      verifiedClients: verified,
      newThisMonth: newThisMonth
    });
  };

  // Data for the pie chart (active vs inactive)
  const statusData = [
    { name: 'Active', value: stats.activeClients, color: '#10B981' },
    { name: 'Inactive', value: stats.totalClients - stats.activeClients, color: '#EF4444' }
  ];

  // Data for the verification pie chart
  const verificationData = [
    { name: 'Verified', value: stats.verifiedClients, color: '#3B82F6' },
    { name: 'Not Verified', value: stats.totalClients - stats.verifiedClients, color: '#F59E0B' }
  ];

  // Mock data for monthly activity
  const monthlyData = [
    { name: 'Jan', clients: 5 },
    { name: 'Feb', clients: 8 },
    { name: 'Mar', clients: 12 },
    { name: 'Apr', clients: 7 },
    { name: 'May', clients: 15 },
    { name: 'Jun', clients: 10 }
  ];

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <Header title="Dashboard Overview" />
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <Header title="Dashboard Overview" />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700">{error}</p>
          <button 
            onClick={loadDashboardData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <Header title="Dashboard Overview" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Clients" 
          value={stats.totalClients} 
          icon="users"
        />
        <StatsCard 
          title="Active Clients" 
          value={stats.activeClients} 
          icon="activity"
        />
        <StatsCard 
          title="Verified Clients" 
          value={stats.verifiedClients} 
          icon="verified"
        />
        <StatsCard 
          title="New This Month" 
          value={stats.newThisMonth} 
          icon="inactive"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Status Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  // Remove the label property to hide the "Inactive: 5" text
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} clients`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Verification Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  // Remove the label property to hide the "Not Verified: 5" text
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} clients`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Client Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clients" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Clients Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clients</h3>
        {clients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No clients found. Please check if the API is returning data in the expected format.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.slice(0, 5).map((client, index) => (
                    <tr key={client.client_id || client.ClientId || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.client_id || client.ClientId || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.client_name || client.ClientName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.agency_name || client.AgencyName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.IsActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {client.IsActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.IsVerified ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {client.IsVerified ? "Verified" : "Not Verified"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                onClick={() => window.location.href = '/clients'}
              >
                View All Clients
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
