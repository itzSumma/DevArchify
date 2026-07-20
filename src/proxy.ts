import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const adminOnly = ["/admin"];
const authRequired = ["/items"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasToken = !!request.cookies.get("auth_token")?.value;

  const needsAdmin = adminOnly.some((p) => pathname.startsWith(p));
  const needsAuth = authRequired.some((p) => pathname.startsWith(p));

  if (needsAdmin && !hasToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (needsAuth && !hasToken && !needsAdmin) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/items/:path*"],
};
