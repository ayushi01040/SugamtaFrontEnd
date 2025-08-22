import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    // Slightly transparent backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 pointer-events-none">
      {/* Modal card */}
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center pointer-events-auto">
        <h3 className="text-xl font-bold mb-4 text-[#334155]">Confirm Discard</h3>
        <p className="text-[#94A3B8] mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-lg bg-[#94A3B8] text-white font-semibold shadow-md transition-colors hover:bg-gray-500 hover:shadow-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-lg bg-[#EF4444] text-white font-semibold shadow-md transition-colors hover:bg-red-600 hover:shadow-lg"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
