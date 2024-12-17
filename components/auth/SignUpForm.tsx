// 'use client'

// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { registerUser, setStep } from '@/store/slices/registerSlice'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/event'
// import { Loader2 } from 'lucide-react'
// import { loginWithSocialProvider } from '@/store/slices/authSlice'
// import type { RootState } from '@/store/store'

// interface RegisterFormProps {
//   onSuccess?: () => void
// }

// export function RegisterForm({ onSuccess }: RegisterFormProps) {
//   const dispatch = useDispatch()
//   const { loading, error, currentStep } = useSelector((state: RootState) => state.register)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     phoneNumber: '',
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (currentStep === 1) {
//       dispatch(setStep(2))
//     } else {
//       const result = await dispatch(registerUser(formData))
//       if (!result.error && onSuccess) {
//         onSuccess()
//       }
//     }
//   }

//   const handleSocialLogin = (provider: 'google' | 'facebook') => {
//     dispatch(loginWithSocialProvider(provider))
//   }

//   if (currentStep === 1) {
//     return (
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Kindness for a Cause</CardTitle>
//           <CardDescription>Rise Together, Serve Together</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//               />
//             </div>
//             <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please wait
//                 </>
//               ) : (
//                 'Register'
//               )}
//             </Button>
//             <div className="relative my-4">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="bg-white px-2 text-gray-500">Or continue with</span>
//               </div>
//             </div>
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full"
//               onClick={() => handleSocialLogin('google')}
//             >
//               Continue with Google
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               className="w-full"
//               onClick={() => handleSocialLogin('facebook')}
//             >
//               Continue with Facebook
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Kindness for a Cause</CardTitle>
//         <CardDescription>Rise Together, Serve Together</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="text-lg font-semibold">Basic Information</div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="firstName">First Name</Label>
//               <Input
//                 id="firstName"
//                 name="firstName"
//                 required
//                 value={formData.firstName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="lastName">Last Name</Label>
//               <Input
//                 id="lastName"
//                 name="lastName"
//                 required
//                 value={formData.lastName}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="dateOfBirth">Date of Birth</Label>
//             <Input
//               id="dateOfBirth"
//               name="dateOfBirth"
//               type="date"
//               required
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phoneNumber">Phone Number</Label>
//             <Input
//               id="phoneNumber"
//               name="phoneNumber"
//               type="tel"
//               required
//               value={formData.phoneNumber}
//               onChange={handleChange}
//             />
//           </div>
//           <Button type="submit" className="w-full">
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </>
//             ) : (
//               'Register'
//             )}
//           </Button>
//           {error && <div className="text-red-500 text-sm text-center">{error}</div>}
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

