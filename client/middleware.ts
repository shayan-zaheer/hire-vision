import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const user = request.cookies.get("user")?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname === "/";
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/resumes");

    if (!user) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/resumes/:path*", "/"],
};