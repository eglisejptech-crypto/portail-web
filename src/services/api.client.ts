import axios from 'axios';
import { authService } from './auth.service';

const API_URL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (config.url?.includes('/auth/login')) {
            return config;
        }

        const token = authService.getToken();
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
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    authService.logout();
                    break;
                case 403:
                    console.error('Access forbidden:', error.response.data);
                    break;
                default:
                    console.error('API Error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);

export { apiClient };
