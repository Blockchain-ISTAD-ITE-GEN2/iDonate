"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { resetPassword } from "@/app/actions";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // In a real application, you'd pass the reset token here as well
      await resetPassword(password);
      setSuccess(true);
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-center text-iDonate-navy-primary">
          កំណត់ពាក្យសម្ងាត់របស់អ្នក
        </CardTitle>
        <CardDescription className="text-center text-iDonate-navy-secondary">
          បញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកនៅខាងក្រោម
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Lock className="w-4 h-4 text-iDonate-navy-primary" />
              <span>
                ពាក្យសម្ងាត់ថ្មី <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នក"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-iDonate-navy-primary" />
                ) : (
                  <Eye className="h-4 w-4 text-iDonate-navy-primary" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
            >
              <Lock className="w-4 h-4 text-iDonate-navy-primary" />
              <span>
                បញ្ជាក់ពាក្យសម្ងាត់ថ្មី <span className="text-red-500">*</span>
              </span>
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មីរបស់អ្នក"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-iDonate-navy-primary" />
                ) : (
                  <Eye className="h-4 w-4 text-iDonate-navy-primary" />
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
            <Alert>
              <AlertDescription className="text-iDonate-navy-primary">
                ពាក្យសម្ងាត់របស់អ្នកត្រូវបានកំណត់ថ្មីដោយជោគជ័យ។​
                អ្នកអាចចូលប្រើគណនីរបស់អ្នកជាមួយនឹងពាក្យសម្ងាត់ថ្មីរបស់អ្នកបានហើយ
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-iDonate-green-primary hover:bg-iDonate-green-secondary text-iDonate-navy-primary"
            disabled={isLoading}
          >
            {isLoading ? "កំពុងដំណើរការ..." : "កំណត់ពាក្យសម្ងាត់ថ្មី"}
          </Button>
        </form>
        {/* <div className="mt-4 text-center">
          <Button variant="link" onClick={() => router.push('/login')}>
            Back to Login
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
