"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Plus, X, CheckCircle } from "lucide-react"
import { cn } from "@/src/utils/utils"

interface DailyGoalsListProps {
  onGoalToggle?: (completed: number, total: number) => void
}

interface Goal {
  id: string
  text: string
  completed: boolean
}

export default function DailyGoalsList({ onGoalToggle }: DailyGoalsListProps) {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete React Native animations module", completed: false },
    { id: "2", text: "Review pull requests", completed: true },
    { id: "3", text: "Prepare slides for technical presentation", completed: false },
    { id: "4", text: "Debug authentication flow issue", completed: false },
    { id: "5", text: "Read TypeScript documentation", completed: false },
  ])
  const [newGoalText, setNewGoalText] = useState("")
  const [isAddingGoal, setIsAddingGoal] = useState(false)

  // Update parent component with completed goals count
  const updateGoalCounts = (updatedGoals: Goal[]) => {
    if (onGoalToggle) {
      const completedCount = updatedGoals.filter((goal) => goal.completed).length
      onGoalToggle(completedCount, updatedGoals.length)
    }
  }

  // Initialize goal counts on first render
  useState(() => {
    updateGoalCounts(goals)
  })

  const handleAddGoal = () => {
    if (!newGoalText.trim()) return

    const newGoal: Goal = {
      id: Date.now().toString(),
      text: newGoalText,
      completed: false,
    }

    const updatedGoals = [...goals, newGoal]
    setGoals(updatedGoals)
    setNewGoalText("")
    setIsAddingGoal(false)
    updateGoalCounts(updatedGoals)
  }

  const toggleGoalCompletion = (id: string) => {
    const updatedGoals = goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal))
    setGoals(updatedGoals)
    updateGoalCounts(updatedGoals)
  }

  const removeGoal = (id: string) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id)
    setGoals(updatedGoals)
    updateGoalCounts(updatedGoals)
  }

  return (
    <div className="space-y-1">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="group flex items-start gap-3 py-2 transition-colors hover:bg-accent/50 rounded-md px-1"
        >
          <Checkbox
            id={`goal-${goal.id}`}
            checked={goal.completed}
            onCheckedChange={() => toggleGoalCompletion(goal.id)}
            className="mt-0.5"
          />
          <label
            htmlFor={`goal-${goal.id}`}
            className={cn("flex-1 text-sm cursor-pointer", goal.completed && "text-muted-foreground line-through")}
          >
            {goal.text}
          </label>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100"
            onClick={() => removeGoal(goal.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}

      {isAddingGoal ? (
        <div className="flex items-center gap-3 bg-accent/50 p-2 rounded-md">
          <div className="mt-0.5 h-4 w-4 shrink-0" />
          <input
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Enter a new goal..."
            className="flex-1 bg-transparent border-0 p-0 text-sm shadow-none focus-visible:ring-0 focus:outline-none"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddGoal()
              } else if (e.key === "Escape") {
                setIsAddingGoal(false)
                setNewGoalText("")
              }
            }}
          />
          <div className="flex shrink-0 gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => {
                setIsAddingGoal(false)
                setNewGoalText("")
              }}
            >
              <X className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={handleAddGoal}>
              <CheckCircle className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs text-muted-foreground mt-2"
          onClick={() => setIsAddingGoal(true)}
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Add Goal
        </Button>
      )}
    </div>
  )
}
