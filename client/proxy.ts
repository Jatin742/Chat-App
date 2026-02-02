// client/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;
  
  // Protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Prevent logged-in users from visiting /auth
  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};