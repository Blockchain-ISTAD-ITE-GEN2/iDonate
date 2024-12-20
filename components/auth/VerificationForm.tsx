"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function VerificationForm() {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(30)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    const newCode = [...code]
    
    // Fill in the code array with pasted digits
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i]
      }
    }
    
    setCode(newCode)
    
    // Focus the next empty input or the last input if all filled
    const nextEmptyIndex = newCode.findIndex(digit => !digit)
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputs.current[focusIndex]?.focus()
  }

  const handleInput = (index: number, value: string) => {
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">2-Step Verification</CardTitle>
        <CardDescription className="text-center">
          We sent a verification code to your device. Enter or paste the code to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="flex gap-2 justify-center"
          onPaste={handlePaste}
        >
          {code.map((digit, index) => (
            <Input
              key={index}
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
                  inputs.current[index] = el;
                }
              }}
            />
          ))}
        </div>
        <Button className="w-full" size="lg">
          Verify
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={timer > 0}
          onClick={() => setTimer(30)}
        >
          {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
        </Button>
      </CardContent>
    </Card>
  )
}

