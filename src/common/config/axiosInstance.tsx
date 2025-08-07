import axios from 'axios';
import { refresh } from '../../controller/auth/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (['/user/login', '/user/register', '/user/refresh'].includes(config.url || ''))
      return config;

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/user/refresh'
    ) {
      originalRequest._retry = true;

      try {
        await refresh();
      } catch (error) {
        window.location.href = '/login';
      }
    } else {
      return Promise.reject(error);
    }
  },
);
export default axiosInstance;
