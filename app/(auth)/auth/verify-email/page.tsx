"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, RefreshCw } from "lucide-react"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = React.useState(false)

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsResending(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Verify your email</h2>
        <p className="text-sm text-muted-foreground mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify
          your account.
        </p>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full gap-2 bg-transparent"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Resend verification email
          </Button>
          <Link href="/auth/login" className="block">
            <Button variant="ghost" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
