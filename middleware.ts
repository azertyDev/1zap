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

    // if (req.nextUrl.pathname.startsWith('/dashboard')) {
    //     if (!req.cookies.has('userInfo')) {
    //         return NextResponse.rewrite(new URL('/', req.url));
    //     }
    // }

    // if (req.nextUrl.pathname === '/dashboard' && req.cookies.get('userInfo')) {
    //     return NextResponse.rewrite(new URL('/dashboard/main', req.url));
    // }
    // if (req.nextUrl.pathname === '/cabinet' && req.cookies.get('userInfo')) {
    //     return NextResponse.rewrite(new URL('/cabinet', req.url));
    // }

    // if (req.nextUrl.pathname === '/cabinet') {
    //     if (!req.cookies.get('userInfo')) {
    //         return NextResponse.rewrite(new URL('/', req.url));
    //     } else {
    //         return NextResponse.rewrite(new URL('/cabinet', req.url));
    //     }
    // }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/cabinet', '/cabinet/:path*'],
};
