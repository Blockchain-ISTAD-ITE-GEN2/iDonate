"use client";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import BackgroundImage from "@/public/images/donation-login.jpg";
import GoogleIcon from "@/public/images/google.png";
import FacebookIcon from "@/public/images/facebook.png";
import SampleLogo from "@/public/logo/logodesign no background.png"
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import AnimatedText from "@/components/auth/AnimationText";
import { LoginSchema } from "../schema/schema";

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .email("គណនីអ៊ីមែលមិនត្រឹមត្រូវ")
    .nonempty("អ៊ីមែលត្រូវបានទាមទារឲ្យស្នើ"),
  password: z.string().nonempty("ពាក្យសម្ងាត់ត្រូវបានទាមទារឲ្យស្នើ"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);

    try {
      // Make a POST request to the login API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "ការចូលប្រើបរាជ័យ");
      }

      const result = await response.json();
      console.log("Login Response:", result);

      // Set a cookie from the frontend (if needed)
      // document.cookie = `idonate-refresh-token=${result.refreshToken};path=/;max-age=3600;`;
      document.cookie = `idonate-refresh-token=${result.refreshToken};path=/;max-age=3600;SameSite=Lax;Secure`;

      // console.log("Cookie set successfully");
      // Set access token in Redux
      dispatch(setToken(result.accessToken));
      // router.push("/");
      console.log("Redirecting to home page...");
      // toast.success("Redirecting to home page...");
      // router.refresh();
      router.push("/");
      toast.success("ការចូលប្រើទទួលបានជោគជ័យ");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error ? error.message : "ការចូលប្រើបានបរាជ័យ",
      );
    } finally {
      setLoading(false);
    }
  };

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
        <Card className="backdrop-blur-md w-full sm:w-[470px] bg-white/70 p-6 shadow-2xl border-none rounded-2xl">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -5 }}
            className="flex justify-center mb-6 xl:mb-4 md:mb-0"
          >
            <Image
              src={SampleLogo}
              alt="iDonate Logo"
              width={160}
              height={160}
              // className="rounded-full p-4 shadow-lg"
              unoptimized
            />
          </motion.div>
          <AnimatedText />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
              >
                <Mail className="w-4 h-4 text-iDonate-navy-primary" />
                <span>
                  អ៉ីមែល <span className="text-red-500">*</span>
                </span>
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
              <label
                htmlFor="password"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
              >
                <Lock className="w-4 h-4 text-iDonate-navy-primary" />
                <span>
                  បញ្ចូលពាក្យសម្ងាត់ <span className="text-red-500">*</span>
                </span>
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
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 focus:outline-none items-center"
              >
                {showPassword ? (
                  <Eye size={18} className="mt-1" />
                ) : (
                  <EyeOff size={18} className="mt-1" />
                )}
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

            <div className="flex gap-16 sm:items-center sm:justify-between text-sm mt-4 md:justify-between">
              <label className="flex items-center space-x-2 cursor-pointer mb-2 sm:mb-0">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-iDonate-navy-primary focus:ring-iDonate-navy-primary"
                />
                <span className="text-gray-600">រក្សាទុកព័ត៌មានរបស់អ្នក</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-iDonate-navy-primary hover:text-iDonate-navy-primary/80 font-medium transition-colors duration-200 items-end"
              >
                ភ្លេចពាក្យសម្ងាត់ឬ?
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 sm:mt-8"
            >
              <Button
                type="submit"
                // onClick={()=>router.push("/")}
                className="w-full h-10 sm:h-11 bg-iDonate-navy-primary hover:bg-iDonate-navy-primary/90 text-white font-medium rounded-md transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "ចូលប្រើ"
                )}
              </Button>
            </motion.div>
          </form>

          <div className="flex items-center my-4 mb-0">
            <span className="flex-grow border-t border-gray-400"></span>
            <span className="mx-4 text-sm text-gray-500 font-medium">
              បន្តជាមួយគណនី
            </span>
            <span className="flex-grow border-t border-gray-400"></span>
          </div>

          <div className="flex items-center justify-center mt-4 space-x-[-20px] md:mt-[-1px]">
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
                  unoptimized
                  className="w-[40px] h-[40px]"
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
                  width={500}
                  height={500}
                  className="w-[40px] h-[40px]"
                  unoptimized
                />
              </Button>
            </motion.div>
          </div>

          <p className="mt-4 md:mt-0 text-center text-sm text-gray-600">
            មិនទាន់មានគណនីមែនទេ?{" "}
            <Link
              href="/sign-up"
              className="text-iDonate-navy-primary hover:text-iDonate-navy-primary/80 font-medium transition-colors duration-200 hover:underline"
            >
              បង្កើតគណនីថ្មី
            </Link>
          </p>
        </Card>
      </motion.div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
