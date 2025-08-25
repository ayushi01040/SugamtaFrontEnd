// src/components/shared/Header.jsx
import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-4 rounded-t-lg shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    </div>
  );
};

export default Header;