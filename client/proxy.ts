import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt");
  // Check if profileSetup is "true" as a string
  const profileSetup = request.cookies.get("profileSetup")?.value === "true";
  const { pathname } = request.nextUrl;

  // 1. If NOT logged in, allow only /auth
  if (!jwt && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // 2. If logged in but profile NOT setup, force /profile
  if (jwt && !profileSetup && pathname !== '/profile') {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // 3. If logged in and profile IS setup, prevent /auth or /profile access
  if (jwt && profileSetup && (pathname.startsWith('/auth') || pathname === '/profile')) {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except static assets and internal Next.js files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
