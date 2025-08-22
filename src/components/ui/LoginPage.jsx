// Remember to install axios: `npm install axios`
// You may also need to install react-icons again if they were not in your original setup.

import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ToggleButton from '../shared/ToggleButton.jsx';
import BusinessNews from '../../components/shared/BusinessNewsAPI.jsx'; // Import the new component

export default function LoginPage({ email, setEmail, password, setPassword, handleSubmit, toggleView }) {
  const [eye, setEye] = useState(true);

  function eyeChange() {
    setEye(!eye);
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-[#334155] mb-2">
        Welcome to <br />
        <span className="text-[#2563EB]">Sugamta</span>
      </h2>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-[#94A3B8] font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-semibold text-[#334155] mb-2 block">
            Email
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaEnvelope className="h-5 w-5" />
            </span>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-[#334155] mb-2 block">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              <FaLock className="h-5 w-5" />
            </span>
            <input
              type={eye ? "password" : "text"}
              placeholder="************"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#94A3B8] cursor-pointer"
              onClick={eyeChange}
            >
              {eye ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input type="checkbox" id="remember-me" className="h-4 w-4 text-[#2563EB] rounded" />
            <label htmlFor="remember-me" className="ml-2 text-sm text-[#334155]">
              Remember me
            </label>
          </div>
          <Link to="/forgot-password" className="text-sm text-[#2563EB] hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#2563EB] text-white font-bold rounded-lg hover:bg-blue-700 hover:cursor-pointer transition-colors"
        >
          Login
        </button>
        <div className="mt-6 text-center">
          <ToggleButton
            onClick={toggleView}
            text="Don't have an account? Register here."
          />
        </div>
      </form>
      
      {/* Insert the new business news component here */}
      <BusinessNews />
    </>
  );
}