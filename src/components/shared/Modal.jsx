// src/components/ui/Modal.jsx
import React, { useEffect, useRef } from "react";

/**
 * A reusable, accessible, and highly-customizable modal component.
 *
 * @param {object} props
 * @param {boolean} props.open - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to be called when the modal needs to be closed.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} props.title - The title of the modal, used for both display and accessibility.
 * @returns {JSX.Element|null} The modal component or null if not open.
 */
export default function Modal({ open, onClose, children, title }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Escape key handler to close the modal
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Body scrolling and focus trapping logic
    if (open) {
      document.body.classList.add("overflow-hidden");
      document.addEventListener("keydown", handleEscapeKey);
      
      // Focus the modal content to trap the keyboard focus within it
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    // Backdrop with click handler for closing
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black/60"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        className="w-full max-w-lg overflow-hidden transform transition-all duration-300 ease-in-out bg-white rounded-2xl shadow-2xl scale-100 opacity-100 border border-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {title || "Modal Title"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors duration-200 hover:text-gray-600 hover:pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children || <p className="text-gray-600">No content provided.</p>}
        </div>
      </div>
    </div>
  );
}