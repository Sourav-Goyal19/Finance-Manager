import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  const isPublicPath = pathname == "/sign-in" || pathname == "/sign-up";

  const nextAuthToken =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!nextAuthToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isPublicPath && nextAuthToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/(dashboard)/:path*",
    "/accounts",
    "/categories",
    "/transactions",
  ],
};
