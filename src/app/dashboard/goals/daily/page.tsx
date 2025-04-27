"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { useToast } from "@/src/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DailyGoalPage() {
  const [goalTitle, setGoalTitle] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!goalTitle.trim()) {
      toast({
        title: "Missing goal title",
        description: "Please enter a title for your daily goal",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    toast({
      title: "Daily goal set!",
      description: "Your goal for today has been set successfully",
    })

    // Reset form or redirect
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-medium tracking-tight text-zinc-900 dark:text-zinc-50">Set Daily Goal</h1>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-50">Today's Goal</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">What do you want to accomplish today?</p>
        <div className="mt-4 space-y-4">
          <Input
            placeholder="Enter your goal for today"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="h-10"
          />
          <div className="flex justify-end gap-2">
            <Link href="/dashboard">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSubmit}>Set Goal</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
