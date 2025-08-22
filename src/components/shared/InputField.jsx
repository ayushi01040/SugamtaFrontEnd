import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Example icon import

export default function InputField({ icon, label, name, value, onChange, placeholder, type = "text", error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="text-sm font-semibold text-[#334155] mb-1 block">
        {label}

        {error && <span className="text-[#EF4444] text-xs ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border rounded-lg min-h-[52px] 
           focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
        />
      </div>
      {(focused || value) && error && <p className="text-[#EF4444] text-xs mt-1">{error}</p>}
    </div>
  );
}