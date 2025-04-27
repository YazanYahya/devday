"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { useToast } from "@/src/hooks/use-toast"
import { CheckCircle, Edit2 } from "lucide-react"

export default function DailyGoalCard() {
  const [dayStarted, setDayStarted] = useState(false)
  const [dailyGoal, setDailyGoal] = useState("")
  const [isEditing, setIsEditing] = useState(true)
  const { toast } = useToast()

  const handleSetGoal = () => {
    if (!dailyGoal.trim()) {
      toast({
        title: "Missing goal",
        description: "Please set a goal for today",
        variant: "destructive",
      })
      return
    }

    setDayStarted(true)
    setIsEditing(false)
    toast({
      title: "Goal set",
      description: "Your daily goal has been set",
    })
  }

  if (dayStarted && !isEditing) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-primary/10 p-1">
            <CheckCircle className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Today's Goal</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{dailyGoal}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-7 gap-1 px-2 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-3 w-3" /> Edit
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="font-medium text-zinc-900 dark:text-zinc-50">Set Today's Goal</h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">What do you want to accomplish today?</p>
      <div className="mt-3 flex gap-2">
        <Input
          placeholder="Enter your goal for today"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          className="h-9"
        />
        <Button className="h-9 px-3" onClick={handleSetGoal}>
          Set
        </Button>
      </div>
    </div>
  )
}
