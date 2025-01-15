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
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectUser, selectVerifyToken } from '@/redux/features/auth/authSlice';
import { useGetUserByUuidQuery } from '@/redux/services/user-profile';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VerificationForm() {
  const verifyToken = useAppSelector(selectVerifyToken);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch(); // Use the dispatch hook
  const router = useRouter();

  const { data: session, status } = useSession();
  const { data } = useGetUserByUuidQuery(user, { pollingInterval: 1000 });

  const [code, setCode] = useState<string[]>(Array(6).fill("")); // Initialize verification code state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Manage error state
  const [timer, setTimer] = useState<number>(30); // Initialize timer state

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);
    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputs.current[focusIndex]?.focus();
  };

  const handleInput = (index: number, value: string) => {
    if (value.length > 1 || !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/users/verify-email?token=${verificationCode}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      alert("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          2-Step Verification
        </CardTitle>
        <CardDescription className="text-center">
          We sent a verification code to your device. Enter or paste the code to continue.
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
          onClick={() => setTimer(30)}
        >
          {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
        </Button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </CardContent>
    </Card>
  );
}
