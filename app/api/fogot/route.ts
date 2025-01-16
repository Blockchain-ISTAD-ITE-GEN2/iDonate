import { ForgetPasswordValues, SignupValues } from "@/lib/definition";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email }: ForgetPasswordValues = body;

  // console.log("email from forgot password", body)
  const response = await fetch(
    `${process.env.IDONATE_BASE_URL}/api/v1/users/forgot-password`,
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
    const restToken = data?.resetPasswordToken || null;
    const email = body.email;
    console.log(email, ":email");

    return NextResponse.json(
      {
        message: "Signup successful",
        token: restToken,
        setEmail: email,
      },
      {
        status: response.status,
      },
    );
  }
}
