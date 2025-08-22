// src/components/shared/ToggleButton.jsx
import React from 'react';

const ToggleButton = ({ onClick, text, className = "" }) => {
  return (
    <button
      type="button" // Important: always use type="button" for non-form-submitting buttons
      onClick={onClick}
      className={` text-xs text-blue-600 hover:text-blue-800 hover:cursor-pointer font-medium transition duration-150 ease-in-out focus:outline-none focus:underline ${className}`}
    >
      {text}
    </button>
  );
};

export default ToggleButton;