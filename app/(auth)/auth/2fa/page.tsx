"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Loader2 } from "lucide-react"

export default function TwoFactorPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [code, setCode] = React.useState(["", "", "", "", "", ""])
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    window.location.href = "/dashboard"
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
        <CardDescription>Enter the 6-digit code from your authenticator app</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
              />
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || code.some((d) => !d)}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Can't access your authenticator?</p>
          <Button variant="link" className="text-primary">
            Use backup code
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
