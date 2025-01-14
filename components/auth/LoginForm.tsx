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
import SampleLogo from "@/public/images/iDonateLogoSample.png";
import AnimationText from "@/components/auth/AnimationText";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";


// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .nonempty("Password is required"),
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      console.log("Login Response:", result);


      // Set a cookie from the frontend (if needed)
      document.cookie = `idonate-refresh-token=${result.refreshToken};path=/;max-age=3600;`; // Expires in 1 hour
      console.log("Cookie set successfully");
        // Set access token in Redux
      dispatch(setToken(result.accessToken));
      // router.push("/");
      console.log("Redirecting to home page...");
      toast.success("Redirecting to home page...");
      router.refresh();
      router.push("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
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
              width={100}
              height={100}
              className="rounded-full shadow-lg"
              priority
            />
          </motion.div>
          <AnimationText />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
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
                {showPassword ? <Eye size={18} className="mt-1" /> : <EyeOff size={18} className="mt-1" />}
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
                <Image src={GoogleIcon} alt="Google" width={60} height={60} unoptimized className="w-[40px] h-[40px]" />
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

// "use client";

// import React, { useEffect, useState, useMemo } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as yup from "yup";
// import { LoginValues } from "@/lib/definition";
// // import { Button } from "flowbite-react";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import Link from "next/link";
// // import { FcGoogle } from "react-icons/fc";
// // import { FaGithub } from "react-icons/fa";
// // import { HiMail, HiLockClosed, HiOutlineX } from "react-icons/hi";
// import { ToastContainer, ToastOptions, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import { signIn, signOut } from "next-auth/react";
// import {
//     authDescStyle,
//     labelStyle,
//     fieldStyle,
//     errorMsgStyle,
//     formHeaderStyle,
//     formTitleStyle,
//     formInputControl,
//     formbuttonStyle,
//     formImageStyle,
//     formXButtonStyle,
//     formTextInImage,
//     formTextInImageTitle,
//     formTextInImageDesc,
//     formTextSpan,
//     activeLinkStyle,
// } from "@/components/auth/AuthStyle";
// // import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// import { setToken } from "@/redux/features/auth/authSlice";
// import { useAppDispatch } from "@/redux/hooks";
// import { useSession } from "next-auth/react";

// function LoginFormComponent() {
//     // States
//     const [viewPassword, setViewPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [executed, setExecuted] = useState(false);

//     // Session from next auth.
//     const { data: session } = useSession();

//     // Custom hook for dispatching next auth.
//     const dispatch = useAppDispatch();
//     const router = useRouter();

//     // Handle view password.
//     function handleViewPassword() {
//         setViewPassword(!viewPassword);
//     }

//     // Initial values for formik.
//     const initialValues: LoginValues = {
//         email: "",
//         password: "",
//     };

//     // Validation schema for formik.
//     const validationSchema = yup.object({
//         email: yup.string().required("* email is required").email(),
//         password: yup.string().required("* Password is required"),
//     });

//     // Memoize the toast configuration
//     const toastConfig: ToastOptions = useMemo(() => ({
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: false
//     }), []);

//     // Handle login with email and password.
//     const handleLoginWithApi = async (values: LoginValues) => {
//         // Set loading to true
//         setLoading(true);
//         toast.info("Login Processing!", toastConfig);

//         try {
//             const res = await fetch(`http://localhost:8080/api/v1/auth/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             })

//             if (res.ok) {
//                 toast.success("Login Successfully! ", toastConfig)
//                 const data = await res.json();
//                 if (data?.accessToken) {
//                     console.log("ACCESS TOKEN : ", data.accessToken)
//                     dispatch(setToken(data.accessToken))
//                     router.refresh()
//                     router.push("/about-us")
//                     console.log("data", data)
//                 }
//             } else {
//                 // meaning the credential can be incorrect ! 
//                 switch (res.status) {
//                     case 401:
//                         toast.error("Incorrect Password!", toastConfig);
//                         break;
//                     case 404:
//                         toast.error("User has been not found!", toastConfig);
//                         break;
//                     case 403:
//                         toast.info("Your account has been block!", toastConfig);
//                         break;
//                     default:
//                         toast.error("Something went wrong!", toastConfig);
//                         break;
//                 }
//             }
//         } catch (error) {
//             console.log("There is an error when login : ", error)
//             toast.error("An unexpected error occurred.", toastConfig)

//         } finally {
//             setLoading(false)
//         }
//     };

//     // Provider
//     const [provider, setProvider] = useState<string>('');

//     const handleProvider = (provider: string) => {
//         localStorage.setItem('provider', provider);
//     }

//     const handleClearProvider = () => {
//         localStorage.removeItem('provider');
//     }

//     useEffect(() => {
//         const provider = localStorage.getItem('provider');
//         if (provider) {
//             setProvider(provider)
//         }
//     }, []);

//     // Handle login with next auth.
//     useEffect(() => {

//         if (!session || executed) return;

//         const handleLoginWithNextAuth = async (
//             email: string,
//             firstName: string,
//             lastName: string,
//             username: string,
//             password: string,
//             confirmedPassword: string,
//             provider: string
//         ) => {

//             setLoading(true);
//             toast.info("Login Processing!", toastConfig);

//             try {
//                 const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email, password }),
//                 });

//                 switch (loginResponse.status) {
//                     case 200:
//                         toast.success('Login Successfully!', toastConfig);
//                         await loginResponse.json();
//                         router.push('/dashboard');
//                         break;
//                     case 401:
//                         toast.error('Incorrect Password!', {
//                             ...toastConfig,
//                             onClose: () => {
//                                 handleClearProvider
//                                 signOut()
//                             },
//                         });
//                         break;
//                     case 403:
//                         toast.info('Your account has been blocked!', {
//                             ...toastConfig,
//                             onClose: () => {
//                                 handleClearProvider
//                                 signOut()
//                             },
//                         });
//                         break;
//                     case 404:
//                         // Handle signup
//                         const signupResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
//                             method: 'POST',
//                             headers: { 'Content-Type': 'application/json' },
//                             body: JSON.stringify({ email, firstName, lastName, username, password, confirmedPassword }),
//                         });

//                         if (signupResponse.ok) {
//                             const loginSocialResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login-social`, {
//                                 method: 'POST',
//                                 headers: { 'Content-Type': 'application/json' },
//                                 body: JSON.stringify({ email, provider }),
//                             });

//                             if (loginSocialResponse.ok) {
//                                 const reLoginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
//                                     method: 'POST',
//                                     headers: { 'Content-Type': 'application/json' },
//                                     body: JSON.stringify({ email, password }),
//                                 });

//                                 if (reLoginResponse.ok) {
//                                     toast.success('Login Successfully!', toastConfig);
//                                     await reLoginResponse.json();
//                                     router.push('/dashboard');
//                                 }
//                             }
//                         }
//                         await signupResponse.json();
//                         break;
//                     case 409:
//                         toast.error('Email already exists!', {
//                             ...toastConfig,
//                             onClose: () => {
//                                 handleClearProvider
//                                 signOut()
//                             },
//                         });
//                         break;
//                     default:
//                         break;
//                 }
//             } catch (err) {
//                 console.error("-> Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (session) {
//             const email = session.user?.email ?? '';
//             const nameParts = session.user?.name?.split(' ') ?? [];
//             const firstName = nameParts[0] ?? '';
//             const lastName = nameParts[1] ?? '';
//             const username = session.user?.name ?? '';
//             const password = `Idata@${process.env.NEXTAUTH_SECRET}2`;
//             const confirmedPassword = password;

//             console.log(password);

//             setExecuted(true);

//             console.log("-> Provider:", provider);

//             handleLoginWithNextAuth(
//                 email,
//                 firstName,
//                 lastName,
//                 username,
//                 password,
//                 confirmedPassword,
//                 provider
//             );
//         }
//     }, [session, executed, router, provider, toastConfig]);


//     return (
//         <main
//             id="login-form"
//             className={`px-4 py-4 md:px-[7.5rem] content-start md:content-center h-screen`}
//         >
//             <ToastContainer />
//             <div
//                 className={`grid grid-cols-1 lg:grid-cols-2 md:gap-x-5 lg:gap-x-[8.125rem] w-full h-auto`}
//             >
//                 <div
//                     id={`formControlLogin`}
//                     className={`h-full order-last lg:order-none flex flex-col justify-center items-center w-full gap-y-4 md:gap-y-[10px]`}
//                 >
//                     <Formik
//                         initialValues={initialValues}
//                         onSubmit={(values, actions) => {
//                             handleLoginWithApi(values);
//                             actions.resetForm();
//                         }}
//                         validationSchema={validationSchema}
//                     >
//                         <Form className={`w-full flex flex-col justify-center`}>
//                             <div id={`formTitleAndDesc`} className={formHeaderStyle}>
//                                 <h1 className={formTitleStyle}>Login</h1>
//                                 <div>
//                                     <h5 className={authDescStyle}>
//                                         If you don’t have an account register. You can
//                                         <span
//                                             className={`cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline ms-[5px]`}
//                                             onClick={() => router.push(`/signup`)}
//                                         >
//                                             register
//                                         </span>
//                                     </h5>
//                                 </div>
//                             </div>
//                             <div id={`formControl`} className={`flex flex-col gap-y-5`}>
//                                 <div className={`flex flex-col`}>
//                                     <div className={formInputControl}>
//                                         <label htmlFor={`email`} className={labelStyle}>
//                                             {/* <HiMail /> */}
//                                             Email
//                                             <span className={`text-red-500`}>*</span>
//                                         </label>
//                                         <Field
//                                             name={`email`}
//                                             placeholder={`example@email.com`}
//                                             className={fieldStyle}
//                                             type={`email`}
//                                         />
//                                     </div>
//                                     <ErrorMessage
//                                         name={`email`}
//                                         render={(msg) => (
//                                             <span className={errorMsgStyle}>{msg}</span>
//                                         )}
//                                     />
//                                 </div>
//                                 <div className={`flex flex-col`}>
//                                     <div className={`${formInputControl} relative`}>
//                                         <label htmlFor={`password`} className={labelStyle}>
//                                             {/* <HiLockClosed /> */}
//                                             Password
//                                             <span className={`text-red-500`}>*</span>
//                                         </label>
//                                         <Field
//                                             name={`password`}
//                                             placeholder={`########`}
//                                             className={fieldStyle}
//                                             type={viewPassword ? "text" : "password"}
//                                         />
//                                         <div
//                                             onClick={() => handleViewPassword()}
//                                             className="absolute cursor-pointer top-[45px] right-[20px]"
//                                         >
//                                             {/* {viewPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />} */}
//                                         </div>
//                                     </div>
//                                     <ErrorMessage
//                                         name={`password`}
//                                         render={(msg) => (
//                                             <span className={errorMsgStyle}>{msg}</span>
//                                         )}
//                                     />
//                                 </div>
//                                 <div className={`flex flex-row justify-between`}>
//                                     <div
//                                         className={`flex gap-x-[10px] justify-center items-center`}
//                                     >
//                                         <Field
//                                             name={`rememberMe`}
//                                             type={`checkbox`}
//                                             className={`rounded-md`}
//                                         />
//                                         <span className={`text-primaryColor`}>Remember me</span>
//                                     </div>
//                                     <Link href={`/forgot-password`} className={activeLinkStyle}>
//                                         Forgot Password ?
//                                     </Link>
//                                 </div>
//                                 <Button
//                                     type={`submit`}
//                                     className={formbuttonStyle}
//                                     color={`blue`}
//                                     disabled={loading}
//                                 >
//                                     {loading
//                                         ?
//                                         "Loading..."
//                                         :
//                                         "Login"}
//                                 </Button>
//                             </div>
//                         </Form>
//                     </Formik>
//                     <div
//                         className={`flex flex-col gap-y-2.5 justify-center items-center`}
//                     >
//                         <span className={`text-[16px]`}>or continue with</span>
//                         <div className={`flex gap-x-[20px] items-center`}>
//                             <span
//                                 className={`cursor-pointer`}
//                                 onClick={(e) => {
//                                     e.preventDefault()
//                                     setLoading(true);
//                                     handleProvider("google")
//                                     signIn("google")
//                                 }}
//                             >
//                                 {/* <FcGoogle size={40} /> */}
//                             </span>
//                             <span
//                                 className={`cursor-pointer`}
//                                 onClick={(e) => {
//                                     e.preventDefault()
//                                     setLoading(true);
//                                     handleProvider("github")
//                                     signIn("github")
//                                 }}
//                             >
//                                 {/* <FaGithub size={36} /> */}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <div id={`formImage`} className={formImageStyle}>
//                     <div className={`text-white flex justify-end items-start`}>
//                         <Link href={`/`}>
//                             {/* <HiOutlineX className={formXButtonStyle} /> */}
//                         </Link>
//                     </div>
//                     <div className={`flex justify-center lg:order-none order-last`}>
//                         <Image
//                             src={`/chiso/logos/IDATA_LOGO.png`}
//                             alt={`Logo`}
//                             className={`hidden lg:block`}
//                             width={300}
//                             height={300}
//                         />
//                         <Image
//                             src={`/chiso/logos/IDATA_LOGO.png`}
//                             alt={`Logo`}
//                             className={`block lg:hidden`}
//                             width={100}
//                             height={100}
//                         />
//                     </div>
//                     <div className={formTextInImage}>
//                         <div className={formTextInImageTitle}>Login to iDATA</div>
//                         <div className={formTextInImageDesc}>
//                             <span className={formTextSpan}>Nice to see you again!</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default LoginFormComponent;