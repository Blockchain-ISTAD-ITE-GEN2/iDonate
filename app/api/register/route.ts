import { SignupValues } from "@/lib/definition";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    firstName,
    lastName,
    gender,
    phoneNumber,
    email,
    username,
    password,
    dateOfBirth,
  }: SignupValues = body;

  const response = await fetch(
    `${process.env.IDONATE_BASE_URL}/api/v1/users/user-registration`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message: "Failed to signup",
      },
      {
        status: response.status,
      },
    );
  } else {
    const data = await response.json();
    const verifyToken = data?.token || null;
    const userInfo = data?.user?.uuid;

    console.log(userInfo);

    return NextResponse.json(
      {
        message: "Signup successful",
        token: verifyToken,
        userInfo: userInfo,
      },
      {
        status: response.status,
      },
    );
  }
}
