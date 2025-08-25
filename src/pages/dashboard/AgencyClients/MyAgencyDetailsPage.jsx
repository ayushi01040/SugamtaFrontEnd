// src/pages/dashboard/AgencyClients/MyAgencyDetailsPage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../../components/shared/Header.jsx'; // Explicit .jsx extension

export default function MyAgencyDetailsPage() {
  const { agencyDetails } = useOutletContext(); // Get agencyDetails from context

  if (!agencyDetails) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-dark-gray">No agency details available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Header title="My Agency Details" />
      <div className="bg-white rounded-lg shadow-xl p-6 mt-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold text-text-dark-gray mb-4">Agency Information</h2>
        <div className="space-y-3">
          <p className="text-text-dark-gray"><strong className="font-medium">Agency Name:</strong> {agencyDetails.name}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Email:</strong> {agencyDetails.email}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Phone:</strong> {agencyDetails.phonenumber}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">License Number:</strong> {agencyDetails.agencyLicenseNumber}</p>
          <p className="text-text-dark-gray"><strong className="font-medium">Address:</strong> {agencyDetails.address}</p>
          {/* Add more agency details as per your API response structure */}
        </div>
      </div>
    </div>
  );
}
