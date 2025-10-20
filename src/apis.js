import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// ✅ Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle token expiry or unauthorized access
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn('🔒 Session expired or unauthorized. Redirecting to login...');
      localStorage.clear();
      window.location.href = '/'; // Redirect to login
    }

    // ✅ Log error details for debugging
    console.error('❌ API error:', {
      status,
      message: error.response?.data?.message || error.message,
      details: error.response?.data?.details || null
    });

    return Promise.reject(error);
  }
);

export default api;
