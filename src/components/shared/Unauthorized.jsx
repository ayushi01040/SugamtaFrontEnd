import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const token = localStorage.getItem("token");

    // If a token is present, check the role to redirect correctly
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role_id = payload.roleid;

        if (role_id === "AO") {
          navigate("/agency-dashboard");
        } else if (role_id === "AC") {
          navigate("/agency-client");
        } else {
          // Fallback if role is not recognized
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (err) {
        // Handle malformed or expired token
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      // If no token, redirect to the login page
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray p-4 text-text-dark-gray">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center transform transition-all duration-300 hover:shadow-2xl">
        {/* Accent Red icon for error */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-red-100 text-accent-red">
          <svg
            className="h-10 w-10 sm:h-12 sm:w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-accent-red">
          Unauthorized Access
        </h1>

        <p className="mt-4 text-lg text-text-dark-gray">
          You do not have the required permission to view this page.
        </p>
        <p className="mt-2 text-md text-text-light-gray">
          Please click the button to go back to your dashboard.
        </p>

        <button
          onClick={handleGoBack}
          className="mt-8 px-6 py-3 rounded-xl bg-primary-blue text-gray font-semibold shadow-lg hover:bg-blue-700  hover:text-white hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
        >
          Go Back
        </button>
        <div className="bg-[#F1F5F9] p-4 text-center py-2.5 my-5 mb-0">
          <p className="text-xs text-[#94A3B8]">
            Sugamta Insurance Portal | Version 2.4
          </p>
          <p className="text-xs text-[#94A3B8]">
            © 2025 Sugamta Insurance. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
