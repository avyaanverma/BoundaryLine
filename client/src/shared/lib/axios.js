import axios from "axios";
import { toast } from "react-toastify";
import { clearStoredAuth, logout, store } from "../../app/store/index.js";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("boundaryline_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const wasLoggedIn = !!store.getState().auth.isAuthenticated;
      clearStoredAuth();
      store.dispatch(logout());

      if (wasLoggedIn) {
        toast.warn("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
