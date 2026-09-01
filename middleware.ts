import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // If on login and already authenticated, bounce to dashboard
  if (pathname === "/admin/login") {
    const session = await getSession();
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
