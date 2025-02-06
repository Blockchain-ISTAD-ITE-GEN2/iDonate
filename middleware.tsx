import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("========| Middleware Running |========");
  // console.log("=> Request URL: ", request.url);
  // console.log("=> Request Method: ", request.method);
  // console.log("=> Request Headers: ", request.headers)

  const cookies = request.cookies;
  // let session = cookies.get("authjs.session-token")
  const refreshToken = cookies.get("idonate-refresh-token"); // later on we should use the ENV value for this

  // console.log("Cookies: ", cookies)
  // console.log("Refresh Token: ",refreshToken)

  if (!refreshToken) {
    const loginUrl = new URL("/", request.url); // Replace "/" with your login page path if different
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next(); 
}

export const config = {
  matcher: ["/donor-dashboard/:path*", "/organization-dashboard/:path*"],
  compiler: {
    removeConsole: true,
  },
};
