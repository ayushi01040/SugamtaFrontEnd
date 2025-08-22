// import api from "../config/api";

// // Fetch all clients
// export const getClients = async () => {
//   try {
//     const { data } = await api.get("/clients"); // GET /api/clients
//     console.log("Fetched clients raw data:", data);

//     // Check the actual field names in the response
//     if (data.data && data.data.length > 0) {
//       console.log("First client fields:", Object.keys(data.data[0]));
//     }

//     return (data.data ?? []).map((c) => ({
//       ClientId: c.client_id || c.ClientId,
//       ClientName: c.client_name || c.ClientName,
//       AgencyName: c.agency_name || c.AgencyName,
//       AgencyEmail: c.agency_email || c.AgencyEmail,
//       // Use the correct field names from your API response
//       IsActive: c.IsActive !== undefined ? Boolean(c.IsActive) : 
//                c.is_active !== undefined ? Boolean(c.is_active) : false,
//       IsVerified: c.IsVerified !== undefined ? Boolean(c.IsVerified) : 
//                  c.is_verified !== undefined ? Boolean(c.is_verified) : false,
//     }));
//   } catch (err) {
//     console.error("Error fetching clients:", err);
//     return [];
//   }
// };

// // Fetch agencies for a specific client
// export const getClientAgencies = async (clientId) => {
//   try {
//     const { data } = await api.get(`/clients/${clientId}/agencies`);
//     console.log(`Fetched agencies for ${clientId}:`, data);

//     return data.data ?? [];
//   } catch (err) {
//     console.error(`Error fetching agencies for ${clientId}:`, err);
//     return [];
//   }
// };

// // Update client status
// export const updateClientStatus = async (payload) => {
//   try {
//     const { data } = await api.put("/clients/update", {
//       ClientId: payload.ClientId,
//       IsActive: payload.IsActive,
//       IsVerified: payload.IsVerified,
//     });
//     console.log("Client status updated:", data);
//     return data;
//   } catch (err) {
//     console.error("Error updating client status:", err);
//     throw err;
//   }
// };



import api from "../config/api";

// Fetch clients with offset-based pagination
export const getClients = async (page = 1, limit = 10) => {
  try {
    // Calculate offset based on page number
    const offset = (page - 1) * limit;
    const { data } = await api.get(`/clients?offset=${offset}&limit=${limit}`);
    console.log("Fetched clients raw data:", data);

    // Extract the clients list and pagination info
    const items = data?.data?.items || [];
    const pagination = data?.data?.pagination || {};
    
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
      total: pagination.total || items.length,
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
    if (data.data && data.data.items && Array.isArray(data.data.items)) {
      return data.data.items;
    } else if (Array.isArray(data.data)) {
      return data.data;
    } else if (Array.isArray(data)) {
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