"use client"
import { Progress } from "@/src/components/ui/progress"
import { Button } from "@/src/components/ui/button"
import { Flame, Moon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { motion } from "framer-motion"

interface DailyProgressSummaryProps {
  streak: number
  goalsCompleted: number
  totalGoals: number
  onCloseDay: () => void
}

export default function DailyProgressSummary({
  streak,
  goalsCompleted,
  totalGoals,
  onCloseDay,
}: DailyProgressSummaryProps) {
  const goalPercentage = totalGoals > 0 ? Math.round((goalsCompleted / totalGoals) * 100) : 0

  return (
    <Card className="border-none shadow-lg h-full">
      <CardHeader className="pb-0 pt-3 px-4">
        <CardTitle className="text-lg font-bold">Today's Progress</CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center gap-4">
          {/* Circular progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-24 h-24 flex-shrink-0"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-primary stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray={`${goalPercentage * 2.51} 251.2`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-1">
              <div className="text-center w-full">
                <div className="text-2xl font-bold leading-none">{goalPercentage}%</div>
                <div className="text-[9px] text-muted-foreground mt-0.5">Completed</div>
              </div>
            </div>
          </motion.div>

          {/* Goals and streak */}
          <div className="space-y-2 flex-grow">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Goals</span>
                <span className="text-xs font-medium">
                  {goalsCompleted}/{totalGoals}
                </span>
              </div>
              <Progress value={goalPercentage} className="h-1.5" />
            </div>

            <div className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-medium">{streak} day streak</span>
            </div>
          </div>
        </div>

        <Button className="w-full text-sm" size="sm" onClick={onCloseDay}>
          <Moon className="mr-1 h-3.5 w-3.5" /> Close Day
        </Button>
      </CardContent>
    </Card>
  )
}
