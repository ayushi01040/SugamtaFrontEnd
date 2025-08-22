import React, { useState } from "react";

export default function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  maxLength, // New prop for max length
}) {
  const [focused, setFocused] = useState(false);

  // Calculate remaining characters if maxLength is provided
  const charsRemaining = maxLength !== undefined ? maxLength - value.length : null;

  return (
    <div className="md:col-span-2">
      <label className="text-sm font-semibold text-[#334155] mb-1 block">
        {label}
        {error && <span className="text-[#EF4444] text-xs ml-1">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        maxLength={maxLength} // Apply maxLength attribute
        className={`w-full px-4 py-3 border rounded-lg min-h-[90px] 
                    focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] 
                    transition-colors resize-none 
                    ${error ? 'border-[#EF4444]' : 'border-gray-300'}`}
      />
      {(focused || value) && error && (
        <p className="text-[#EF4444] text-xs mt-1">{error}</p>
      )}
      {/* Character counter */}
      {maxLength !== undefined && (
        <p className="text-xs text-gray-500 mt-1 text-right">
          {value.length}/{maxLength} characters ({charsRemaining} left)
        </p>
      )}
    </div>
  );
}
