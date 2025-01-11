"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { setCode, setTimer, setLoading, setError, resetCode } from "@/redux/features/verification/verificationSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation"; // Import useRouter

export default function VerificationForm() {
  const dispatch = useDispatch();
  const { code, timer, isLoading, error } = useSelector(
    (state: RootState) => state.verification,
  );
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => dispatch(setTimer(timer - 1)), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, dispatch]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
        dispatch(setCode({ index: i, value: pastedData[i] }));
      }
    }

    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputs.current[focusIndex]?.focus();
  };

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return;

    dispatch(setCode({ index, value }));

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Simulate an API call
      const response = await fetch(
        `http://localhost:8080/api/v1/users/verify-email?token=${verificationCode}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error("Verification failed");
      }

      // Show success message
      alert("Email verified successfully!");

      // Redirect to the login page
      router.push("/auth/login"); // Update the path to your login page
    } catch (error) {
      dispatch(setError("Failed to verify email. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          2-Step Verification
        </CardTitle>
        <CardDescription className="text-center">
          We sent a verification code to your device. Enter or paste the code to
          continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
              value={digit}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => {
                if (el) {
                  inputs.current[index] = el;
                }
              }}
            />
          ))}
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={handleVerify}
          disabled={isLoading}
        >
          Verify
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={timer > 0}
          onClick={() => dispatch(setTimer(30))}
        >
          {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </CardContent>
    </Card>
  );
}