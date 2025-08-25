// src/components/ui/Admin/EditModal.jsx

import React from 'react';
import Modal from '../../shared/Modal.jsx'; // Assuming Modal is in components/ui/
import Button from '../../shared/Button.jsx'; // Assuming Button is in components/ui/

export default function EditModal({ open, onClose, selected, setSelected, saveEdit, saving }) {
  if (!selected) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelected(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Edit Client: ${selected.ClientName}`}
    >
      <div className="p-4 space-y-4">
        <div>
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Is Active</label>
          <input
            type="checkbox"
            id="isActive"
            name="IsActive"
            checked={selected.IsActive}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="isVerified" className="block text-sm font-medium text-gray-700">Is Verified</label>
          <input
            type="checkbox"
            id="isVerified"
            name="IsVerified"
            checked={selected.IsVerified}
            onChange={handleChange}
            className="mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        {/* Add more editable fields here as needed */}
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button
          onClick={saveEdit}
          disabled={saving}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </Modal>
  );
}