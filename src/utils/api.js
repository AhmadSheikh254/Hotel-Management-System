import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

const guestRoutePatterns = ['/guest-auth', '/reservations/my', '/service-requests/my'];

api.interceptors.request.use((config) => {
  const url = config.url || '';
  const useGuestToken = guestRoutePatterns.some((p) => url.includes(p));
  const token = useGuestToken
    ? localStorage.getItem('guest_token')
    : localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

export default api;
