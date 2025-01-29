"use server";

import { sendPasswordResetEmail } from "@/lib/email";
import { updateUserPassword } from "@/lib/auth";

// actions.ts
export async function resetPassword(newPassword: string, confirmPassword: string, email: string, token: string): Promise<void> {

  console.log("Reset password token: ",token)
  const endpoint = `${process.env.IDONATE_BASE_URL}/api/v1/users/password-reset?token=${token}`;
  const requestBody = {
    email,
    newPassword,
    confirmPassword,
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to reset password.");
  }
}

export async function requestPasswordReset(email: string) {
  await await sendPasswordResetEmail(email);
}
