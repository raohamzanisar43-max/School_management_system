import axios from 'axios';

// We point requests to relative routes, which Vite proxies to http://127.0.0.1:8000
const API_URL = '/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    // Quick View uses fake local tokens for role previewing — the real backend
    // will always 401 these, so skip the network call and go straight to each
    // service's mock-data fallback instead of flooding the console with errors.
    if (token && token.startsWith('mock_jwt_token_')) {
      return Promise.reject(new Error('Quick View mock session — skipping real API call'));
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
