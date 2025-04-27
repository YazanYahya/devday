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
      <CardHeader className="pb-2 pt-6 px-6">
        <CardTitle className="text-xl font-bold">Today's Progress</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-32 h-32">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{goalPercentage}%</span>
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Goals</span>
            <span className="text-sm font-medium">
              {goalsCompleted}/{totalGoals}
            </span>
          </div>
          <Progress value={goalPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-center gap-2 py-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium">{streak} day streak</span>
        </div>

        <Button className="w-full" size="lg" onClick={onCloseDay}>
          <Moon className="mr-2 h-4 w-4" /> Close Day
        </Button>
      </CardContent>
    </Card>
  )
}
