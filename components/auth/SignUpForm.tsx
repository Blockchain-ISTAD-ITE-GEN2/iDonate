"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, z } from "zod";
import { format } from "date-fns";
import { Loader2, Mail, Lock, EyeOff, Eye, CalendarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import GoogleIcon from "@/public/images/google.png";
import FacebookIcon from "@/public/images/facebook.png";

// Validation schemas
const step1Schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const step2Schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "That's not a date!",
  }).max(new Date(), "Date of birth cannot be in the future"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,}$/, "Phone number must be at least 10 digits"),
});

type Step1Inputs = z.infer<typeof step1Schema>;
type Step2Inputs = z.infer<typeof step2Schema>;
type FormInputs = Step1Inputs & Step2Inputs;

// Step Indicator Component
function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-500">Step {step} of 2</div>
      <div className="flex space-x-2">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            step === 1 ? "bg-blue-500" : "bg-gray-300"
          )}
        />
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            step === 2 ? "bg-blue-500" : "bg-gray-300"
          )}
        />
      </div>
    </div>
  );
}

// Date of Birth Picker Component
function DateOfBirthPicker({
  watch,
  setValue,
  errors,
}: {
  watch: any;
  setValue: any;
  errors: any;
}) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const years = Array.from({ length: 200 }, (_, i) => 1900 + i).reverse();

  return (
    <div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full pl-3 text-left font-normal",
                !watch("dateOfBirth") && "text-muted-foreground"
              )}
            >
              {watch("dateOfBirth") ? (
                format(watch("dateOfBirth"), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={watch("dateOfBirth")}
              onSelect={(date) => setValue("dateOfBirth", date as Date)}
              disabled={(date) =>
                date.getFullYear() < 1900 || date.getFullYear() > year
              }
              initialFocus
              month={new Date(year, 0)}

            />
          </PopoverContent>
        </Popover>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2 rounded-md text-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {errors.dateOfBirth && (
        <div className="text-red-500 text-xs mt-1">
          {errors.dateOfBirth.message}
        </div>
      )}
    </div>
  );
}

// Main Form Component
export default function SignUpForm() {
  const { data: session, status } = useSession();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(step === 1 ? step1Schema : step2Schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (step === 1) {
      const isValid = await trigger(["email", "password"]);
      if (isValid) setStep(2);
    } else {
      try {
        console.log("Registration data:", data);
        toast.success("Registration successful!");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
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
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Donor Registration
          </h2>
        </div>
        <Card className="w-full mx-auto p-4 sm:p-10 bg-transparent">
          <StepIndicator step={step} />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Email and Password */}
                <div>
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Personal Information */}
                <div>
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <select {...register("gender")} className="w-full border p-2">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <DateOfBirthPicker
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {step === 1 ? "Continue" : "Register"}
            </Button>
          </form>
        </Card>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
