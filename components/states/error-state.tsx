"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react"

interface ErrorStateProps {
  variant?: "error" | "offline" | "disconnected"
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ variant = "error", title, description, onRetry, className }: ErrorStateProps) {
  const getContent = () => {
    switch (variant) {
      case "offline":
        return {
          icon: WifiOff,
          title: title || "You're offline",
          description: description || "Please check your internet connection and try again.",
        }
      case "disconnected":
        return {
          icon: WifiOff,
          title: title || "Connection lost",
          description: description || "We lost connection to the server. Attempting to reconnect...",
        }
      default:
        return {
          icon: AlertTriangle,
          title: title || "Something went wrong",
          description: description || "An error occurred while loading. Please try again.",
        }
    }
  }

  const content = getContent()
  const Icon = content.icon

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{content.description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 bg-transparent">
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      )}
    </div>
  )
}
