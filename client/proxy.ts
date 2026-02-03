import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  // Allow static files
  // if (
  //   pathname.startsWith('/_next') ||
  //   pathname.startsWith('/favicon.ico')
  // ) {
  //   return NextResponse.next();
  // }

  // If NOT logged in and not already on /auth
  if (!token && pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If logged in and trying to access auth page
  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
