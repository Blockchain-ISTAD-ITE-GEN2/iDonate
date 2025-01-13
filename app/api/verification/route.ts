import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VerifyValues } from "@/lib/definition";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {
        token,
    }: VerifyValues = body;

    const response = await fetch(
        `${process.env.IDONATE_BASE_URL}/api/v1/users/verify-email`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }
    );

    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Failed to verify",
            },
            {
                status: response.status,
            }
        );
    }

    const data = await response.json();
    return NextResponse.json(
        {
            token: data.token,
        },
        {
            status: response.status,
        }
    );
}