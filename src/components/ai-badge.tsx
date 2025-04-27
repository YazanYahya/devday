import { Sparkles } from "lucide-react"
import { cn } from "@/src/utils/utils"

interface AIBadgeProps {
  className?: string
  variant?: "default" | "subtle" | "outline"
  size?: "sm" | "default"
}

export default function AIBadge({ className, variant = "default", size = "default" }: AIBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full",
        variant === "default" && "bg-primary/10 text-primary px-2 py-0.5",
        variant === "subtle" && "bg-muted text-primary px-2 py-0.5",
        variant === "outline" && "border border-primary/30 text-primary px-2 py-0.5",
        size === "sm" && "text-xs",
        size === "default" && "text-sm",
        className,
      )}
    >
      <Sparkles className={cn("text-primary", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span className="font-medium">AI</span>
    </div>
  )
}
