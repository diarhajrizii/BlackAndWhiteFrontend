// src/api/axiosInstance.js
import axios from "axios";

const api = axios.create(); // No need for baseURL if using CRA proxy

// Add JWT token to every request from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token, "Toook");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
