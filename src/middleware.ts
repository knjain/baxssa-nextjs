// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   });
//   const url = request.nextUrl;

//   if (
//     token &&
//     (url.pathname === "/sign-in" ||
//       url.pathname === "/sign-up" ||
//       url.pathname === "/")
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const url = request.nextUrl;

  // If the user is authenticated and tries to access sign-in, sign-up, or the root page, redirect to dashboard
  if (
    token &&
    (url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is not authenticated and tries to access any dashboard route or the root page, redirect to sign-in
  if (
    !token &&
    (url.pathname.startsWith("/dashboard") || url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*"],
};
