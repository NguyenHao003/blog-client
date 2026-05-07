export const defaultConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? '',
    APP_BASE_URL: process.env.APP_BASE_URL ?? '',
    REDIRECT_URI: process.env.REDIRECT_URI ?? '',
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN ?? '',
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ?? '',
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE ?? '',
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL ?? '',
};
