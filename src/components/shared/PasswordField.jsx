import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordField({ label, name, value, onChange, placeholder, error }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-sm font-semibold text-[#334155] mb-1 block">
        {label} <span className="text-[#EF4444] text-xs ml-1">*</span> {/* Password is required */}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
          <FaLock />
        </span>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
         className="w-full pl-12 pr-10 py-3 border rounded-lg min-h-[52px] 
           focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"

        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#94A3B8] cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && <p className="text-[#EF4444] text-xs mt-1">{error}</p>}
    </div>
  );
}