'use client'

import { useState, useRef, useEffect } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Toast } from "@/components/ui/toast"
import { useAppSelector } from "@/redux/hooks"
import { selectUser, selectVerifyToken } from '@/redux/features/auth/authSlice'
import { useGetUserByUuidQuery } from '@/redux/services/user-profile'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

export default function VerificationForm() {
  const verifyToken = useAppSelector(selectVerifyToken)
  const user = useAppSelector(selectUser)
  const router = useRouter();

  const { data: session, status } = useSession()
  const { data } = useGetUserByUuidQuery(user ?? '', { pollingInterval: 1000 })

  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timer, setTimer] = useState<number>(30)
  const [isVerified, setIsVerified] = useState(false)

  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newCode = [...code]

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }

    setCode(newCode)
    const nextEmptyIndex = newCode.findIndex((digit) => !digit)
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputs.current[focusIndex]?.focus()
  }

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value.replace(/\D/g, '')
    setCode(newCode)

    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code]
      newCode[index - 1] = ""
      setCode(newCode)
      inputs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const verificationCode = code.join("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_IDONATE_API_URL}/api/v1/users/verify-email?token=${verificationCode}`,
        {
          method: "POST",
        }
      )

      if (!response.ok) {
        throw new Error("Verification failed")
      }

      setIsVerified(true)
      toast("Email verified successfully!", {
        duration: 5000,
      })
      setTimeout(() => router.push("/login"), 5000)
    } catch (error) {
      setError("Failed to verify email. Please try again.")
      toast.error("Verification failed");
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = () => {
    // Implement the logic to resend the code here
    setTimer(30)
    toast("Code resent", {
     duration: 5000,
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">
          2-Step Verification
        </CardTitle>
        <CardDescription className="text-center">
          We sent a verification code to your email. Enter the code to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={(6 - code.filter(c => c === "").length) / 6 * 100} className="w-full" />
        <div className="flex gap-2 justify-center" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1 }}
              animate={{ scale: digit ? 1.05 : 1 }}
              transition={{ duration: 0.1 }}
            >
              <Input
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
                    inputs.current[index] = el
                  }
                }}
                aria-label={`Digit ${index + 1} of verification code`}
              />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-center flex items-center justify-center"
            >
              <AlertCircle className="mr-2" size={16} />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          size="lg"
          onClick={handleVerify}
          disabled={isLoading || isVerified || code.some(c => c === "")}
        >
          {isLoading ? (
            <span className="flex items-center">
              Verifying...
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="ml-2"
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </span>
          ) : isVerified ? (
            <span className="flex items-center">
              Verified
              <CheckCircle className="ml-2 h-4 w-4" />
            </span>
          ) : (
            <span className="flex items-center">
              Verify
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={timer > 0 || isVerified}
          onClick={handleResendCode}
        >
          {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
        </Button>
      </CardFooter>
    </Card>
  )
}

