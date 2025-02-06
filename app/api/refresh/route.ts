import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  const cookieName =
    process.env.COOKIE_REFRESH_TOKEN_NAME ||
    "idonate-refresh-token" ;

  const credential = cookieStore.get("idonate-refresh-token");

  if (!credential) {
    return NextResponse.json(
      {
        message: "Token not found",
      },
      {
        status: 404,
      },
    );
  }

  const refreshToken = credential?.value.toString();
  console.log(refreshToken);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshToken }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to refresh access token",
      },
      {
        status: response.status,
      },
    );
  }

  const data = await response.json();
  const refresh = data?.refreshToken || null;
  const access = data?.accessToken || null;

  const serialized = serialize(cookieName, refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return NextResponse.json(
    {
      accessToken: access,
    },
    {
      headers: {
        "Set-Cookie": serialized,
      },
    },
  );
}