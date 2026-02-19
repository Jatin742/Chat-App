import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const profileSetup =
    request.cookies.get("profileSetup")?.value === "true";

  const { pathname } = request.nextUrl;

  // 1️⃣ Not logged in
  if (!token) {
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL("/auth", request.url)
      );
    }
    return NextResponse.next();
  }

  // 2️⃣ Logged in but profile NOT setup
  if (token && !profileSetup) {
    if (!pathname.startsWith("/profile")) {
      return NextResponse.redirect(
        new URL("/profile", request.url)
      );
    }
    return NextResponse.next();
  }

  // 3️⃣ Logged in and profile setup
  if (token && profileSetup) {
    // Prevent going back to auth
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL("/chat", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
