import React from "react";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";

export default function EditModal({ open, onClose, selected, setSelected, saveEdit, saving }) {
  if (!selected) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Edit ${selected?.ClientName ?? ""}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium text-slate-700">Active</label>
          <input
            type="checkbox"
            checked={!!selected.IsActive}  // ✅ Use PascalCase
            onChange={(e) => setSelected((s) => ({ ...s, IsActive: e.target.checked }))} // ✅ Use PascalCase
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="font-medium text-slate-700">Verified</label>
          <input
            type="checkbox"
            checked={!!selected.IsVerified}  // ✅ Use PascalCase
            onChange={(e) => setSelected((s) => ({ ...s, IsVerified: e.target.checked }))} // ✅ Use PascalCase
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button className="bg-slate-600 hover:bg-slate-700" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={saving} onClick={saveEdit}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}