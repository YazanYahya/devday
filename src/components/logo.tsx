import { Sparkles } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
        <Sparkles className="h-6 w-6 text-primary relative z-10" />
      </div>
      {showText && (
        <span className="text-xl font-bold">
          Dev<span className="text-primary">Day</span>
        </span>
      )}
    </Link>
  )
}
