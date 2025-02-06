import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieRefreshTokenName =
    process.env.COOKIE_REFRESH_TOKEN_NAME || "idonate-refresh-token";
  const cookieAccessTokenName = "access";
  const cookieAuthName =
    process.env.COOKIE_AUTH_TOKEN_NAME || "authjs.session-token";
  const cookieStore = cookies();
  const credential = cookieStore.get(cookieRefreshTokenName);

  if (!credential) {
    return NextResponse.json(
      {
        message: "Token not found",
      },
      {
        status: 400,
      },
    );
  }

  const refreshToken = credential.value;
  console.log("data", refreshToken);

  if (refreshToken) {
    cookieStore.delete(cookieRefreshTokenName);
    cookieStore.delete(cookieAuthName);
    cookieStore.delete(cookieAccessTokenName);

    return NextResponse.json(
      {
        message: "Logout successful",
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Failed to logout",
    },
    {
      status: 400,
    },
  );
}
