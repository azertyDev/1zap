import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/dashboard') {
        return NextResponse.rewrite(new URL('/dashboard/main', req.url));
    }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*'],
};
