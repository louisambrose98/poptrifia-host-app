import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public and middle routes
  if (pathname.startsWith("/public") || pathname.startsWith("/middle")) {
    return NextResponse.next();
  }

  // Protect private routes
  if (pathname.startsWith("/private")) {
    // Placeholder: Replace with real auth check (e.g., Amplify Auth)
    const isAuthenticated = false; // TODO: Implement real check
    if (!isAuthenticated) {
      const url = request.nextUrl.clone();
      url.pathname = "/public";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/public/:path*", "/middle/:path*"],
};
