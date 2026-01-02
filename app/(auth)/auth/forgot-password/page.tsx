"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Check your email</h2>
          <p className="text-sm text-muted-foreground mb-6">We've sent a password reset link to your email address.</p>
          <Link href="/auth/login">
            <Button variant="outline" className="gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
            <MessageCircle className="w-7 h-7 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">Forgot password?</CardTitle>
        <CardDescription>Enter your email and we'll send you a reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@company.com" className="pl-10" required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send reset link"}
          </Button>
        </form>

        <div className="mt-6 text-center">
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
