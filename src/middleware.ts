// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Allow these paths without auth
  if (
    path === "/" ||
    path.startsWith("/api/login") ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Protect viewer (and anything else except allowed above)
  const hasAuthCookie = !!req.cookies.get("auth_token")?.value;
  if (path.startsWith("/viewer") && !hasAuthCookie) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Security headers
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "same-origin");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
