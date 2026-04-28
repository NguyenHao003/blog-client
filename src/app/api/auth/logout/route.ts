import { AUTH_TOKEN_COOKIE_NAME } from '@/lib/auth-token-cookie';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const logoutUrl = new URL('/auth/logout', request.url);
    const response = NextResponse.redirect(logoutUrl);

    response.cookies.set({
        name: AUTH_TOKEN_COOKIE_NAME,
        value: '',
        path: '/',
        maxAge: 0,
    });

    return response;
}
