"use client";

import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GoogleIcon from "@/public/images/google.png";
import FacebookIcon from "@/public/images/facebook.png";
import Image from "next/image";
import Link from "next/link";
import { UseDispatch } from "react-redux";
import  SignUpIllustration from "@/public/landing/Donation-SignUp.jpg";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { totalmem } from "os";
import { add } from "date-fns";

const inputClassName = (value: string) =>
  `w-full px-4 py-2 border ${
    value ? "border-green-500" : "border-gray-300"
  } rounded-md ${
    value ? "ring-2 ring-green-500" : "ring-1 ring-gray-300"
  } focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ease-in-out bg-transparent`;

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  interface FormData {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date | undefined;
    address: string;
    phoneNumber: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: undefined,
    address: "",
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formatDate = (date: Date | undefined) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const requestBody = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        dateOfBirth: formatDate(formData.dateOfBirth),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (response.status === 409) {
        toast.error("អ៊ីមែលនេះបានចុះឈ្មោះរួចហើយ");
      } else if (response.status === 400) {
        toast.error("ការចុះឈ្មោះបរាជ័យ");
      } else if (response.status === 500) {
        toast.error("មានបញ្ហាកើតឡើងក្នុងការចុះឈ្មោះ");
      } else if (response.status === 401) {
        toast.error("ការចុះឈ្មោះបរាជ័យ");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || toast.error("ការចុះឈ្មោះបរាជ័យ"));
      }

      toast.success("ការចុះឈ្មោះបានជោគជ័យ!");
      router.push("/verification");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "ការចុះឈ្មោះបរាជ័យ");
    } finally {
      setIsSubmitting(false);
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

  const StepIndicator = () => (
    <div className="flex justify-between items-center mb-6">
      <div className="text-sm text-gray-500">ជំហានទី {step} នៃ​ 2</div>
      <div className="flex space-x-2">
        {[1, 2].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              s === step
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "",
      }));
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* <div className="bg-green-600 text-white p-8 md:w-1/3 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-4">ស្វាគមន៍</h2>
            <p className="text-center mb-4">ចូលរួមជាមួយយើងដើម្បីជួយសហគមន៍</p>
            <Image
              src={SignUpIllustration}
              alt="Donation Illustration"
              width={1000}
              height={1000}
              className="mb-4 h-full w-full object-cover"
              unoptimized
            />
          </div> */}
          <div
  className="bg-green-600 text-white p-8 md:w-1/3 flex flex-col justify-center items-center"
  style={{
    backgroundImage: `url(${SignUpIllustration.src})`, // Use the image source for the background
    backgroundSize: 'cover', // Ensure the image covers the entire div
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Avoid repeating the image
  }}
>
  {/* <h2 className="text-3xl font-bold mb-4">ស្វាគមន៍</h2>
  <p className="text-center mb-4">ចូលរួមជាមួយយើងដើម្បីជួយសហគមន៍</p> */}
</div>

          <div className="p-8 md:w-2/3 bg-white bg-opacity-90">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-green-600">
                ការចុះឈ្មោះរបស់អ្នកបរិច្ចាគ
              </h2>
            </div>
            <Card className="w-full mx-auto shadow-none border-none">
              <CardContent className="p-0">
                <StepIndicator />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
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
                                className={inputClassName(formData.email)}
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
                                ពាក្យសម្ងាត់
                                <span className="text-red-500">*</span>
                              </span>
                            </label>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Idonate123$$"
                                className={inputClassName(formData.password)}
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
                              className={inputClassName(formData.username)}
                            />
                            {errors.username && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.username}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                className={inputClassName(formData.firstName)}
                              />
                              {errors.firstName && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.firstName}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                                នាមត្រកូល{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="San"
                                className={inputClassName(formData.lastName)}
                              />
                              {errors.lastName && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                                ភេទ <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className={inputClassName(formData.gender)}
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
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                              អាស័យដ្ឋាន <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="eg. Phnom Penh, Cambodia"
                              className={inputClassName(formData.address)}
                            />
                            {errors.address && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.address}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-iDonate-navy-primary mb-1">
                              លេខទូរស័ព្ទ{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              placeholder="012354622"
                              className={inputClassName(formData.phoneNumber)}
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
                            href="/login"
                            className="text-iDonate-green-primary font-medium hover:underline"
                          >
                            ចុចទីនេះ
                          </Link>
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
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

                      <div className="flex items-center justify-center mt-4 space-x-[-20px] md:mt-[-1px]">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            className="w-20 h-20 rounded-full bg-transparent border-none hover:bg-transparent transition-colors duration-200"
                            onClick={() =>
                              signIn("google", { callbackUrl: "/" })
                            }
                          >
                            <Image
                              src={GoogleIcon || "/placeholder.svg"}
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
                            onClick={() =>
                              signIn("facebook", { callbackUrl: "/" })
                            }
                          >
                            <Image
                              src={FacebookIcon || "/placeholder.svg"}
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
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
