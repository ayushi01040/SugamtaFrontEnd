// src/config/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api", // 👈 your Django/Fastapi backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically (if available in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;