// src/pages/dashboard/AgencyClients/MyPlansPage.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../../components/shared/Header.jsx';

export default function MyPlansPage() {
  const { clientPlans } = useOutletContext();

  if (!clientPlans || clientPlans.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-text-dark-gray">No plans available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Header title="My Plans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {clientPlans.map((plan) => (
          <div key={plan.plan_id} className="bg-white rounded-lg shadow-xl p-6 border border-light-gray hover:shadow-2xl transition-shadow duration-300">
            {/* Using API response property names */}
            <h2 className="text-xl font-semibold text-primary-blue mb-2">{plan.plan_name}</h2>
            <p className="text-text-dark-gray mb-1"><strong className="font-medium">Type:</strong> {plan.plan_type || 'Insurance'}</p> {/* Use a default value if 'plan_type' isn't available */}
            <p className="text-text-dark-gray mb-1"><strong className="font-medium">Coverage:</strong> ₹{plan.cover_amount}</p>
            <p className="text-text-dark-gray mb-1"><strong className="font-medium">Period:</strong> {plan.policy_period} years</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}