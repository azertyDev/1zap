import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!req.cookies.has('userInfo')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (req.nextUrl.pathname.startsWith('/cabinet')) {
        if (!req.cookies.has('userInfo')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/cabinet', '/cabinet/:path*'],
};
