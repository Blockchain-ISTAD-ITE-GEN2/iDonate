"use client";

import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import GoogleIcon from "@/public/images/google.png";
import FacebookIcon from "@/public/images/facebook.png";
import Image from "next/image";
import Link from "next/link";
import { UseDispatch } from "react-redux";
import { useRegisterMutation } from "@/store/api/authApi";

import {
  // Alert,
  // AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "util";
import { DayPicker } from "react-day-picker";
import { DatePicker } from "./DayPicker";

// import { watch } from 'fs';

const SignUpFormComponent = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  interface FormData {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date | undefined;
    phoneNumber: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "Male",
    dateOfBirth: undefined,
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = { ...errors };
    if (!formData.email) {
      newErrors.email = "អ៉ីមែលត្រូវបានទាមទារ";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "ពាក្យសម្ងាត់ត្រូវបានទាមទារ";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = { ...errors };
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      if (validateStep2()) {
        setIsSubmitting(true);
        try {
          // Simulating API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log("Form submitted:", formData);
          // useRegisterMutation(formData); // Pass formData as an argument
          // Here you would typically make your API call
          alert("Registration successful!");
        } catch (error) {
          console.error("Registration error:", error);
          alert("Registration failed. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-500">ជំហានទី {step} នៃ​ 2</div>
      <div className="flex space-x-2">
        <span
          className={`h-2 w-2 rounded-full ${
            step === 1 ? "bg-iDonate-green-primary" : "bg-gray-300"
          }`}
        />
        <span
          className={`h-2 w-2 rounded-full ${
            step === 2 ? "bg-iDonate-green-primary" : "bg-gray-300"
          }`}
        />
      </div>
    </div>
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date)
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }))
    // Clear error when user starts typing
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "",
      }))
    }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-semibold text-green-600">
            ការចុះឈ្មោះរបស់អ្នកបរិច្ចាគ
          </h2>
        </div>
        <Card className="w-full mx-auto">
          <CardContent className="p-6">
            <StepIndicator />
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-iDonate-navy-primary mb-1">
                      <Mail className="w-4 h-4 text-iDonate-navy-primary" />
                      <span>
                        អ់ីមែល <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="idonate.istad.co@gmail.com"
                        className="w-full"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-iDonate-navy-primary mb-1">
                      <Lock className="w-4 h-4 text-iDonate-navy-primary" />
                      <span>
                        ពាក្យសម្ងាត់<span className="text-red-500">*</span>
                      </span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Idonate123$$"
                        className="w-full pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-iDonate-navy-primary" />
                        ) : (
                          <Eye className="w-4 h-4  text-iDonate-navy-primary" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                      ឈ្មោះអ្នកប្រើប្រាស់{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="SokSan"
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                        គោត្តនាម <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Sok"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                        នាមត្រកូល <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="San"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                      ភេទ <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border-none ring-0 focus:outline-none focus:ring-0 rounded-md p-2 text-iDonate-navy-primary text-sm "
                    >
                      <option value="Male">ប្រុស</option>
                      <option value="Female">ស្រី</option>
                      <option value=" ">មិនបញ្ចេញ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                      ថ្ងៃ ខែ ឆ្នាំ កំណើត{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <DatePicker
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                      error={errors.dateOfBirth}
                    />

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                      លេខទូរស័ព្ទ <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="012354622"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="text-center">
                <span className="mx-4 text-sm text-gray-500 font-medium ">
                  តើអ្នកមានគណនីរួចហើយមែនទេ?{" "}
                  <Link
                    href="/auth/login"
                    className="text-iDonate-green-primary font-medium hover:underline"
                  >
                    ចុចទីនេះ
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                {step === 1
                  ? "បន្ទាប់"
                  : isSubmitting
                  ? "កំពុងធ្វើការចុះឈ្មោះ..."
                  : "បង្កើតគណនី"}
              </Button>

              <div className="flex items-center my-4 mb-0">
                <span className="flex-grow border-t border-gray-400"></span>
                <span className="mx-4 text-sm text-gray-500 font-medium">
                  បន្តជាមួយគណនី
                </span>
                <span className="flex-grow border-t border-gray-400"></span>
              </div>

              <div className="flex items-center justify-center mt-4 space-x-[-20px]">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                      unoptimized
                      className="w-[40px] h-[40px]"
                    />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-20 h-20 rounded-full bg-transparent border-none hover:bg-transparent transition-colors duration-200"
                    onClick={() => signIn("facebook", { callbackUrl: "/" })}
                  >
                    <Image
                      src={FacebookIcon}
                      alt="Facebook"
                      width={500}
                      height={500}
                      className="w-[40px] h-[40px]"
                      unoptimized
                    />
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );}
};

export default SignUpFormComponent;
