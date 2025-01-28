import { serialize } from "cookie";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// handle login
export async function POST(req: NextRequest) {
  // Parse the request body to get the email and password
  const body = await req.json();
  const { email, password } = body;

  // Make a POST request to the Our API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    },
  );
  console.log("Response: ", response);

  // If the request fails, return an error message to the client-side
  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to login",
      },
      {
        status: response.status,
      },
    );
  }

  // If the request is successful, parse the response body to get the data
  const data = await response.json();
  console.log("data: ", data);
  const user = data?.user || null;
  const accessToken = data?.accessToken || null;
  const refreshToken = data?.refreshToken || null;
  console.log("RefreshToken: ", refreshToken);

  //  console.log("AcessToken: ", accessToken);

  // Serialize the refresh token and set it as a cookie with
  // (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
  const cookieName =
    process.env.COOKIE_REFRESH_TOKEN_NAME || "idonate-refresh-token";
  const serialized = serialize(cookieName, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax", // or "strict" or "none"
  });
  document.cookie = `idonate-refresh-token=${refreshToken};path=/;max-age=3600;`;

  // Return the access token and user data to the client-side
  // with the serialized refresh token as a cookie
  return NextResponse.json(
    {
      accessToken: accessToken,
      user: user,
    },
    {
      status: response.status,
      headers: {
        "Set-Cookie": serialized,
      },
    },
  );
}
