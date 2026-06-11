import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL) || "https://api-dev.boundaryline.com/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Inject JWT token from localStore or Redux setup
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

// Response Interceptor: Seamless error processing, logging, and Refresh Token capability
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error status is Unauthorized (401) and request was not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("[BoundaryLine API] Detected 401 Unauthorized. Attempting silent token refresh...");

      try {
        // Mock Refresh Token request
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: localStorage.getItem("boundaryline_refresh_token"),
        });

        if (refreshResponse.status === 200) {
          const { token, refreshToken } = refreshResponse.data;
          
          localStorage.setItem("boundaryline_token", token);
          localStorage.setItem("boundaryline_refresh_token", refreshToken);

          // Retry the original query with updating authorization header
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("[BoundaryLine API] Token refresh process failed. Terminating user session.");
        localStorage.removeItem("boundaryline_token");
        localStorage.removeItem("boundaryline_refresh_token");
        // Optional path routing redirect or state action trigger
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
