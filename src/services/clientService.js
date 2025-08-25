// src/services/clientService.js

import api from "../config/api";

// Fetch clients with offset-based pagination
export const getClients = async (page = 1, limit = 10) => {
  try {
    // Calculate offset based on page number
    const offset = (page - 1) * limit;
    const { data } = await api.get(`/clients?offset=${offset}&limit=${limit}`);
    console.log("Fetched clients raw data:", data);

    // --- FIX START ---
    // The raw data shows the array is directly under data.data, not data.data.items
    const items = data?.data || []; // Corrected this line to directly use data.data
    // --- FIX END ---
    
    // The API response also provides pagination info, which we should use.
    // Assuming 'total' is directly available in 'data.data.pagination' if present,
    // otherwise fallback to 'items.length'
    const pagination = data?.data?.pagination || { total: items.length }; 
    
    console.log("Clients items:", items);
    console.log("Pagination info:", pagination);

    return {
      clients: items.map((c) => ({
        ClientId: c.client_id ?? c.ClientId ?? c.id ?? "",
        ClientName: c.client_name ?? c.ClientName ?? c.name ?? "",
        AgencyName: c.agency_name ?? c.AgencyName ?? c.agency ?? "",
        AgencyEmail: c.agency_email ?? c.AgencyEmail ?? c.email ?? "",
        IsActive:
          c.IsActive !== undefined
            ? Boolean(c.IsActive)
            : c.is_active !== undefined
            ? Boolean(c.is_active)
            : c.active !== undefined
            ? Boolean(c.active)
            : false,
        IsVerified:
          c.IsVerified !== undefined
            ? Boolean(c.IsVerified)
            : c.is_verified !== undefined
            ? Boolean(c.is_verified)
            : c.verified !== undefined
            ? Boolean(c.verified)
            : false,
      })),
      total: pagination.total || items.length, // Use pagination.total if available
      page: page,
      limit: pagination.limit || limit,
      offset: pagination.offset || offset,
    };
  } catch (err) {
    console.error("Error fetching clients:", err);
    return { clients: [], total: 0, page: 1, limit: 10, offset: 0 };
  }
};

// Fetch agencies for a specific client (also with pagination)
export const getClientAgencies = async (clientId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { data } = await api.get(`/clients/${clientId}/agencies?offset=${offset}&limit=${limit}`);
    console.log(`Fetched agencies for ${clientId}:`, data);

    // Handle the paginated response structure
    if (data.data && Array.isArray(data.data.items)) { // Assuming agencies might also be in 'data.data.items'
      return data.data.items;
    } else if (Array.isArray(data.data)) { // Or directly in 'data.data'
      return data.data;
    } else if (Array.isArray(data)) { // Or if the top-level 'data' is the array
      return data;
    }
    
    return [];
  } catch (err) {
    console.error(`Error fetching agencies for ${clientId}:`, err);
    return [];
  }
};

// Update client status (unchanged)
export const updateClientStatus = async (payload) => {
  try {
    const { data } = await api.put("/clients/update", {
      ClientId: payload.ClientId,
      IsActive: payload.IsActive,
      IsVerified: payload.IsVerified,
    });
    console.log("Client status updated:", data);
    return data;
  } catch (err) {
    console.error("Error updating client status:", err);
    throw err;
  }
};