import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://YOUR_BACKEND_URL/api', // 🔴 BEDDEL HAD URL
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor bach tzid token f kol request AUTOMATICALLY
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            console.log('🔑 Token being sent:', token ? 'Token exists' : 'No token');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('✅ Authorization header set');
            } else {
                console.log('⚠️ No token found in storage');
            }
        } catch (error) {
            console.error('❌ Error reading token:', error);
        }

        console.log('📤 Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Interceptor bach tgérer les responses w errors
api.interceptors.response.use(
    (response) => {
        console.log('✅ Response received:', response.config.url);
        return response;
    },
    async (error) => {
        console.error('❌ Response error:', error.response?.status, error.response?.data);

        if (error.response?.status === 401) {
            console.log('🚫 Unauthorized - Token expired or invalid');
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('user');
        }

        return Promise.reject(error);
    }
);

export default api;