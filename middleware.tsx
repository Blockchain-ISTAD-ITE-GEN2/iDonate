import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  console.log("accessToken: ", accessToken);


  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.redirect(new URL("/", req.url));

  // return NextResponse.next();
}

export const config = {
  matcher: ["/donor-dashboard", "/organization-dashboard/dashboard"], 
};