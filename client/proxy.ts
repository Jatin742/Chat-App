import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const profileSetup = request.cookies.get('profileSetup')?.value === 'true';

  const { pathname } = request.nextUrl;

  // If not logged in
  if (!token) {
    if (!pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    return NextResponse.next();
  }

  // If logged in but profile not setup
  if (token && !profileSetup) {
    if (!pathname.startsWith('/profile')) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }
    return NextResponse.next();
  }

  // If logged in and profile setup is done
  if (token && profileSetup) {
    // if (pathname === '/' || pathname.startsWith('/profile') || pathname.startsWith('/auth')) {
    //   return NextResponse.redirect(new URL('/chat', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|favicon.ico|api).*)'],
};
