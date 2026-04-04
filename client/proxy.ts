import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const profileSetup = request.cookies.get("profileSetup")?.value === "true";
  const { pathname } = request.nextUrl;

  console.log("PATH:", pathname, "JWT:", jwt);

  // ✅ Always allow homepage
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ✅ Allow auth page
  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  // ❌ If not logged in → go to auth
  if (!jwt) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Profile setup logic
  if (!profileSetup && pathname !== "/profile") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (profileSetup && pathname === "/profile") {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth', '/chat/:path*', '/profile/:path*'],
};