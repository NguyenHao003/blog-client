export const AUTH_TOKEN_COOKIE_NAME = 'auth_access_token';

type SetTokenCookieOptions = {
    expiresAt?: number;
};

export function getAuthTokenFromCookie() {
    if (typeof document === 'undefined') {
        return null;
    }

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const tokenCookie = cookies.find((cookie) =>
        cookie.startsWith(`${AUTH_TOKEN_COOKIE_NAME}=`)
    );

    if (!tokenCookie) {
        return null;
    }

    const [, value = ''] = tokenCookie.split('=');
    return value ? decodeURIComponent(value) : null;
}

export function setAuthTokenCookie(
    token: string,
    options: SetTokenCookieOptions = {}
) {
    if (typeof document === 'undefined') {
        return;
    }

    const parts = [
        `${AUTH_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}`,
        'Path=/',
        'SameSite=Lax',
    ];

    if (options.expiresAt) {
        parts.push(`Expires=${new Date(options.expiresAt * 1000).toUTCString()}`);
    }

    if (window.location.protocol === 'https:') {
        parts.push('Secure');
    }

    document.cookie = parts.join('; ');
}

export function clearAuthTokenCookie() {
    if (typeof document === 'undefined') {
        return;
    }

    document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}
