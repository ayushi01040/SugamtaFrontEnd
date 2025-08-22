import React, { useState } from 'react';
import { FaGlobeEurope } from 'react-icons/fa';

export default function DropdownField({ label, name, value, onChange, options, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="text-sm font-semibold text-[#334155] mb-1 block">
        {label}
        {error && <span className="text-[#EF4444] text-xs ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 border rounded-lg min-h-[52px] 
           focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] 
           transition-colors appearance-none pr-8"

        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
        </div>
      </div>
      {(focused || value) && error && <p className="text-[#EF4444] text-xs mt-1">{error}</p>}
    </div>
  );
}