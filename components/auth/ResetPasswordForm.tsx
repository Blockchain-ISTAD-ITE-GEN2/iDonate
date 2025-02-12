"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { resetPassword } from "@/app/actions";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(""); // Add email field if needed
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (!token) {
      setError("Invalid token. Please try again.");
      setIsLoading(false);
      return;
    }

    // Validate inputs
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Call the reset password action
      await resetPassword(password, confirmPassword, email, token);
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold text-iDonate-navy-primary">
          កំណត់ពាក្យសម្ងាត់
        </CardTitle>
        <CardDescription className="text-iDonate-navy-secondary">
          បញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកនៅខាងក្រោម
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              អ៊ីមែល <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="បញ្ចូលអ៊ីមែល"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              ពាក្យសម្ងាត់ថ្មី <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-iDonate-navy-primary" />
                ) : (
                  <Eye className="w-5 h-5 text-iDonate-navy-primary" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              បញ្ជាក់ពាក្យសម្ងាត់ <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="បញ្ជាក់ពាក្យសម្ងាត់"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-iDonate-navy-primary" />
                ) : (
                  <Eye className="w-5 h-5 text-iDonate-navy-primary" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default">
              <AlertDescription>
                ពាក្យសម្ងាត់របស់អ្នកត្រូវបានកំណត់ថ្មីដោយជោគជ័យ!
                អ្នកនឹងត្រូវបានផ្លាស់ប្តូរទៅទំព័រចូលក្នុង 2 វិនាទី។
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-iDonate-green-primary hover:bg-iDonate-green-secondary text-white"
            disabled={isLoading}
          >
            {isLoading ? "កំពុងដំណើរការ..." : "កំណត់ពាក្យសម្ងាត់"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
