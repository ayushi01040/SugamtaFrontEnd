// src/pages/dashboard/AgencyClients/SecondaryClientsPage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../../components/shared/Header.jsx'; // Explicit .jsx extension

export default function SecondaryClientsPage() {
  const { secondaryClients } = useOutletContext();

  if (!secondaryClients || secondaryClients.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-dark-gray">No secondary clients associated.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Header title="Secondary Clients" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {secondaryClients.map((client) => (
          <div key={client.secondaryclientid} className="bg-white rounded-lg shadow-xl p-6 border border-light-gray hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-primary-blue mb-2">
              {client.firstname} {client.lastname}
            </h2>
            <p className="text-text-dark-gray mb-1">
              <strong className="font-medium">Email:</strong> {client.secondaryclientemail}
            </p>
            <p className="text-text-dark-gray mb-1">
              <strong className="font-medium">Phone:</strong> {client.phonenumber}
            </p>
            <p className="text-text-dark-gray">
              <strong className="font-medium">Relationship:</strong> {client.relationship}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}