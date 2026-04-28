import { getAccessToken } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import {
    clearAuthTokenCookie,
    getAuthTokenFromCookie,
    setAuthTokenCookie,
} from './auth-token-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (typeof window !== 'undefined') {
            let token = getAuthTokenFromCookie();

            if (!token) {
                try {
                    const tokenResponse = await getAccessToken({
                        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                        includeFullResponse: true,
                    });

                    token = tokenResponse.token;

                    if (token) {
                        setAuthTokenCookie(token, {
                            expiresAt: tokenResponse.expires_at,
                        });
                    }
                } catch {
                    clearAuthTokenCookie();
                }
            }

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: Handle common errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Return the full AxiosResponse object to preserve type structure
        return response;
    },
    (error) => {
        // Extract error message
        const message =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong';

        console.log(message);

        // Show error notification in the browser
        // if (typeof window !== "undefined") {
        //   notification.error({
        //     message: "API Error",
        //     description: message,
        //     placement: "topRight",
        //   });
        // }

        return Promise.reject(error);
    }
);

export default axiosInstance;
