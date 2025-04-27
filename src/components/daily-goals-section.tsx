"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { useToast } from "@/src/hooks/use-toast"
import { CheckCircle, Edit2, Plus, X, AlignLeft } from "lucide-react"
import { cn } from "@/src/utils/utils"

interface Goal {
  id: string
  text: string
  completed: boolean
}

export default function DailyGoalsSection() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", text: "Complete React Native animations module", completed: false },
    { id: "2", text: "Review pull requests", completed: true },
    { id: "3", text: "Prepare slides for technical presentation", completed: false },
  ])
  const [newGoalText, setNewGoalText] = useState("")
  const [notes, setNotes] = useState(
    "Meeting with the team at 2 PM to discuss the new feature implementation. Remember to prepare the demo for the client call tomorrow.",
  )
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const { toast } = useToast()

  const handleAddGoal = () => {
    if (!newGoalText.trim()) {
      toast({
        title: "Empty goal",
        description: "Please enter a goal",
        variant: "destructive",
      })
      return
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      text: newGoalText,
      completed: false,
    }

    setGoals([...goals, newGoal])
    setNewGoalText("")
    setIsAddingGoal(false)

    toast({
      title: "Goal added",
      description: "Your goal has been added for today",
    })
  }

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)))
  }

  const removeGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const saveNotes = () => {
    setIsEditingNotes(false)
    toast({
      title: "Notes saved",
      description: "Your notes have been saved",
    })
  }

  return (
    <div className="rounded-lg border border-border bg-card shadow-sm">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-card-foreground">Today's Goals</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setIsAddingGoal(true)}
          >
            <Plus className="h-3.5 w-3.5" /> Add Goal
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {goals.map((goal) => (
          <div key={goal.id} className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent">
            <button
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                goal.completed ? "border-primary bg-primary text-primary-foreground" : "border-input",
              )}
              onClick={() => toggleGoalCompletion(goal.id)}
            >
              {goal.completed && <CheckCircle className="h-3 w-3" />}
            </button>
            <span
              className={cn("flex-1 text-sm text-foreground", goal.completed && "text-muted-foreground line-through")}
            >
              {goal.text}
            </span>
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

        {isAddingGoal && (
          <div className="flex items-center gap-3 bg-accent px-4 py-3">
            <div className="mt-0.5 h-4 w-4 shrink-0" />
            <Input
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="Enter a new goal..."
              className="h-7 flex-1 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
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
        )}
      </div>

      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-card-foreground">Notes</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setIsEditingNotes(!isEditingNotes)}
          >
            <Edit2 className="h-3.5 w-3.5" /> {isEditingNotes ? "Save" : "Edit"}
          </Button>
        </div>

        {isEditingNotes ? (
          <div className="mt-2">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes for today..."
              className="min-h-[100px] resize-none border-input focus-visible:ring-ring"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsEditingNotes(false)
                }
              }}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setIsEditingNotes(false)}>
                Cancel
              </Button>
              <Button size="sm" className="h-7 text-xs" onClick={saveNotes}>
                Save Notes
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-2 rounded-md bg-accent p-3">
            {notes ? (
              <p className="text-sm leading-relaxed text-foreground">{notes}</p>
            ) : (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                <AlignLeft className="h-4 w-4" />
                <span>No notes for today</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
