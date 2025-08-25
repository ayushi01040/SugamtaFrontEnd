// src/pages/dashboard/Admin/ManageClientsPage.jsx

import { useEffect, useMemo, useState } from "react";
import Button from "../../../components/ui/Button.jsx";
import { getClients, getClientAgencies, updateClientStatus } from "../../../services/clientService.js";
import EditModal from "../../../components/ui/Admin/EditModal.jsx";
import Modal from "../../../components/ui/Modal.jsx";
import Header from '../../../components/shared/Header.jsx'; 

export default function ManageClientsPage() { 
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [agenciesOpen, setAgenciesOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(null); 

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch clients whenever page or limit changes
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { clients, total } = await getClients(page, limit);
        if (mounted) {
          setRows(clients);
          setTotal(total);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [page, limit]);

  // Filter clients based on search query
  const filtered = useMemo(() => {
    if (!q) return rows;
    const s = q.toLowerCase();
    return rows.filter(
      (r) =>
        (r.ClientName ?? "").toLowerCase().includes(s) ||
        (r.AgencyName ?? "").toLowerCase().includes(s) ||
        (r.AgencyEmail ?? "").toLowerCase().includes(s) ||
        (r.ClientId ?? "").toLowerCase().includes(s)
    );
  }, [rows, q]);

  // Toggle IsActive status
  const toggleActiveStatus = async (client) => {
    setUpdating(client.ClientId);
    
    const updatedPayload = {
      ClientId: client.ClientId,
      IsActive: !client.IsActive,
      IsVerified: client.IsVerified
    };

    try {
      await updateClientStatus(updatedPayload);
      setRows(prev =>
        prev.map(r =>
          r.ClientId === client.ClientId ? { ...r, IsActive: !client.IsActive } : r
        )
      );
    } catch (err) {
      console.error("Failed to update client status:", err);
      setRows(prev =>
        prev.map(r =>
          r.ClientId === client.ClientId ? { ...r, IsActive: client.IsActive } : r
        )
      );
    } finally {
      setUpdating(null);
    }
  };

  // View agencies modal
  const onView = async (row) => {
    setSelected(row);
    const list = await getClientAgencies(row.ClientId);
    setAgencies(list);
    setAgenciesOpen(true);
  };

  // Edit client modal
  const onEdit = (row) => {
    setSelected({
      ...row,
      IsActive: Boolean(row.IsActive),
      IsVerified: Boolean(row.IsVerified),
    });
    setEditOpen(true);
  };

  // Save edited status
  const saveEdit = async () => {
    if (!selected) return;
    setSaving(true);

    const updatedPayload = {
      ClientId: selected.ClientId,
      IsActive: Boolean(selected.IsActive),
      IsVerified: Boolean(selected.IsVerified),
    };

    try {
      await updateClientStatus(updatedPayload);
      setRows((prev) =>
        prev.map((r) =>
          r.ClientId === selected.ClientId ? { ...r, ...updatedPayload } : r
        )
      );
      setEditOpen(false);
    } catch (err) {
      console.error("Failed to update client:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Header title="Manage Clients" />
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-semibold text-slate-800"></h1>
        <input
          className="px-3 py-2 rounded-lg border bg-white"
          placeholder="Search clients…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Client ID</th>
              <th className="text-left px-4 py-3">Client Name</th>
              <th className="text-left px-4 py-3">Agency Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="text-left px-4 py-3">Verified</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  Loading clients…
                </td>
              </tr>
            ) : filtered.length ? (
              filtered.map((r) => (
                <tr key={r.ClientId} className="border-t">
                  <td className="px-4 py-3">{r.ClientId}</td>
                  <td className="px-4 py-3">{r.ClientName}</td>
                  <td className="px-4 py-3">{r.AgencyName}</td>
                  <td className="px-4 py-3">{r.AgencyEmail}</td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={r.IsActive}
                        onChange={() => toggleActiveStatus(r)}
                        disabled={updating === r.ClientId}
                      />
                      <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all 
                        ${r.IsActive ? 'peer-checked:bg-green-600' : 'bg-gray-200'}`}
                      />
                      {updating === r.ClientId && (
                        <span className="ml-2 text-xs text-gray-500">Updating...</span>
                      )}
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        r.IsVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.IsVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      className="bg-slate-700 hover:bg-slate-800"
                      onClick={() => onView(r)}
                    >
                      View
                    </Button>
                    <Button onClick={() => onEdit(r)}>Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4">
        <div>
          Page {page} of {Math.ceil(total / limit) || 1}
        </div>
        <div className="flex gap-2">
          <Button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>
          <Button
            disabled={page >= Math.ceil(total / limit)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Agencies Modal */}
      <Modal
        open={agenciesOpen}
        onClose={() => setAgenciesOpen(false)}
        title={`Agencies of ${selected?.ClientName ?? ""}`}
      >
        {agencies.length ? (
          <div className="max-h-96 overflow-auto space-y-4">
            {agencies.map((agency, i) => (
              <div key={i} className="border rounded-lg p-3 bg-slate-50">
                {Object.entries(agency).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex border-b last:border-b-0 py-1"
                  >
                    <div className="w-1/3 font-medium text-slate-700">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="w-2/3 text-slate-800">
                      {typeof val === "boolean" ? (val ? "Yes" : "No") : String(val)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-600">No agencies found for this client.</div>
        )}
      </Modal>

      {/* Edit Modal */}
      <EditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        selected={selected}
        setSelected={setSelected}
        saveEdit={saveEdit}
        saving={saving}
      />
    </div>
  );
}