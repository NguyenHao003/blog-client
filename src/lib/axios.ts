import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Add auth tokens here
axiosInstance.interceptors.request.use(
    (config) => {
        // Example: add Authorization header if token exists in localStorage
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
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
