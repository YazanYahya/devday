"use client"

import { format } from "date-fns"
import { Calendar, Target } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"

interface DashboardHeaderProps {
  userName: string
}

export default function DashboardHeader({ userName }: DashboardHeaderProps) {
  const today = new Date()
  const formattedDate = format(today, "EEEE, MMMM d, yyyy")

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
        <h1 className="text-xl font-medium tracking-tight">Welcome, {userName}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
          <Target className="h-3 w-3" /> 5 Active Goals
        </Badge>
        <Badge variant="outline" className="bg-muted">
          12 Day Streak
        </Badge>
      </div>
    </div>
  )
}
