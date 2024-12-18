'use client';

import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import BackgroundImage from "@/public/images/donation-login.jpg";
import GoogleIcon from "@/public/images/google.png";
import FacebookIcon from "@/public/images/facebook.png";
import SampleLogo from "@/public/images/iDonateLogoSample.png";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required")
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")
    .nonempty("Password is required"),
  
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        rememberMe: values.rememberMe,
      });

      if (result?.error) {
        setError("email", { type: "manual", message: "Invalid email or password" });
        setError("password", { type: "manual", message: "Invalid email or password" });
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10" />
      <Image
        src={BackgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-md mx-auto px-4 sm:px-6"
      >
        <Card className="backdrop-blur-md w-full sm:w-[470px] bg-white/70 p-6 sm:p-10 shadow-2xl border-none rounded-2xl">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            className="flex justify-center mb-6 sm:mb-8"
          >
            <Image
              src={SampleLogo}
              alt="iDonate Logo"
              width={100}
              height={100}
              className="rounded-full shadow-lg"
              priority
            />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-iDonate-navy-primary">
            Welcome to{" "}
            <span className="text-iDonate-green-primary/100 inline-block transform hover:scale-110 transition-transform duration-200">
              iDonate
            </span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 text-iDonate-navy-primary" />
                <span>Email <span className="text-red-500">*</span></span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="idonate.istad.co@gmail.com"
                {...register("email")}
                className={`w-full h-10 sm:h-11 rounded-md ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-iDonate-navy-primary"}`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                <Lock className="w-4 h-4 text-iDonate-navy-primary" />
                <span>Password <span className="text-red-500">*</span></span>
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Idonate123@#$!"
                {...register("password")}
                className={`w-full h-10 sm:h-11 pr-10 rounded-md ${errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-iDonate-navy-primary"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-16 md:gap-36 sm:items-center sm:justify-between text-sm mt-4">
              <label className="flex items-center space-x-2 cursor-pointer mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="rounded border-gray-300 text-iDonate-navy-primary focus:ring-iDonate-navy-primary"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-iDonate-navy-primary hover:text-iDonate-navy-primary/80 font-medium transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 sm:mt-8"
            >
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-iDonate-navy-primary hover:bg-iDonate-navy-primary/90 text-white font-medium text-lg rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </motion.div>
          </form>

          <div className="flex items-center my-4 mb-0">
            <span className="flex-grow border-t border-gray-400"></span>
            <span className="mx-4 text-sm text-gray-500 font-medium">or continue with</span>
            <span className="flex-grow border-t border-gray-400"></span>
          </div>

          <div className="flex items-center justify-center mt-4 space-x-[-20px]">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-20 h-20 rounded-full bg-transparent border-none hover:bg-transparent transition-colors duration-200"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <Image
                  src={GoogleIcon}
                  alt="Google"
                  width={60}
                  height={60}
                />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-20 h-20 rounded-full bg-transparent border-none hover:bg-transparent transition-colors duration-200"
                onClick={() => signIn("facebook", { callbackUrl: "/" })}
              >
                <Image
                  src={FacebookIcon}
                  alt="Facebook"
                  width={60}
                  height={60}
                />
              </Button>
            </motion.div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-iDonate-navy-primary hover:text-iDonate-navy-primary/80 font-medium transition-colors duration-200 hover:underline"
            >
              Sign up now
            </Link>
          </p>
        </Card>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

