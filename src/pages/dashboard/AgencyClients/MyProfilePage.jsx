// src/pages/dashboard/AgencyClients/MyProfilePage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../../components/shared/Header.jsx'; // Explicit .jsx extension

export default function MyProfilePage() {
  const { clientProfile } = useOutletContext(); // Get clientProfile from context

  if (!clientProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-dark-gray">No profile data available.</p>
      </div>
    );
  }

  // Combine address components into a single string// Filters out null/undefined and joins with comma

  return (
    <div className="p-4">
      <Header title="My Profile" />
      <div className="bg-white rounded-lg shadow-xl p-6 mt-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-text-dark-gray mb-4">Client Information</h2>
        <div className="space-y-3">
          <p className="text-text-dark-gray"><strong className="font-medium">Full Name:</strong> {clientProfile.fullName}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Email:</strong> {clientProfile.email}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Phone:</strong> {clientProfile.phonenumber}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Address:</strong> {clientProfile.address}</p>
          {/* Add other details as needed */}
          {/* <p className="text-text-dark-gray"><strong className="font-medium">Client ID:</strong> {clientProfile.primaryclientid}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Agency ID:</strong> {clientProfile.agencyid}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Client Code:</strong> {clientProfile.clientcode}</p> */}
        </div>
      </div>
    </div>
  );
}
