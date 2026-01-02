import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingStateProps {
  variant?: "card" | "list" | "table" | "chat"
  count?: number
  className?: string
}

export function LoadingState({ variant = "card", count = 3, className }: LoadingStateProps) {
  if (variant === "card") {
    return (
      <div className={cn("grid gap-4", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === "list") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-3/4" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === "chat") {
    return (
      <div className={cn("space-y-4 p-4", className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={cn("flex gap-3", i % 2 === 0 ? "" : "flex-row-reverse")}>
            <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
            <div className={cn("space-y-2", i % 2 === 0 ? "items-start" : "items-end")}>
              <Skeleton className="h-16 w-48 rounded-2xl" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      ))}
    </div>
  )
}
