// src/components/ui/Modal.jsx
import React, { useEffect } from "react";
import Button from "./Button.jsx"; // Import the Button component

export default function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    if (open) {
      // Prevent background scrolling when modal is open
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  if (!open) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4">
      {/* Modal Box */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative z-50 transform scale-100 opacity-100 transition-all duration-300 ease-out border border-gray-300">
        
        {/* Modal Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          {title || "Modal Title"}
        </h2>

        {/* Modal Content */}
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          {children || <p className="text-gray-600">No content provided.</p>}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-6 border-t pt-4">
          <Button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
