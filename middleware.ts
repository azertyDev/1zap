import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // console.log('req.cookies: ', req.cookies);

    if (req.nextUrl.pathname.startsWith('/dashboard') && !req.cookies.get('userInfo')) {
        return NextResponse.rewrite(new URL('/', req.url));
    }
    if (req.nextUrl.pathname === '/dashboard' && req.cookies.get('userInfo')) {
        return NextResponse.rewrite(new URL('/dashboard/main', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*'],
};
