import axios from 'axios';

/**
 * Shared axios instance for all API calls.
 * - Base URL points to the Express backend
 * - Auth interceptor attaches JWT from localStorage
 * - Response interceptor provides centralized error handling
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor: attach token ──────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor: normalize errors ─────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface the server message when available
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    console.error('[API Error]', message);
    return Promise.reject({ message, status: error.response?.status });
  },
);

export default apiClient;
