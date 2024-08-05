import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  console.log("asdasadsf")
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const url = request.nextUrl.clone();
  // If the user is authenticated and tries to access sign-in, sign-up, or the root page, redirect to admin dashboard
  console.log(url)
  if (
    token &&
    (url.pathname === "/admin/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/")
  ) {
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // If the user is not authenticated and tries to access any dashboard route or the root page, redirect to admin sign-in
  if (
    !token &&
    (url.pathname.startsWith("/admin/dashboard")
     || 
     url.pathname === "/" ||  url.pathname === "/admin" )
  ) {
    url.pathname = "/admin/sign-in";
    return NextResponse.redirect(url);
  }

  // Rewrite all requests to include /admin prefix if not already present
  if (!url.pathname.startsWith("/admin")) {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/sign-in", "/sign-up", "/admin/dashboard/:path*", "/admin/:path*"],
};
