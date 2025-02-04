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
    // console.log("There is no session or refresh token, it will redirect back to the login ")
    return NextResponse.redirect(new URL("/login", request.url).toString());
  }
}

export const config = {
  matcher: ["/donor-dashboard/:path*", "/organization-dashboard/:path*"],
  compiler: {
    removeConsole: true,
  },
};
