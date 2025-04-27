"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"
import { useToast } from "@/src/hooks/use-toast"
import { ArrowLeft, LightbulbIcon, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Label } from "@/src/components/ui/label"

export default function ReflectionPage() {
  const [achievements, setAchievements] = useState("")
  const [challenges, setChallenges] = useState("")
  const [insights, setInsights] = useState("")
  const { toast } = useToast()

  const handleSubmit = () => {
    if (!achievements.trim() && !challenges.trim() && !insights.trim()) {
      toast({
        title: "Missing reflection",
        description: "Please fill in at least one reflection field",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    toast({
      title: "Reflection added!",
      description: "Your reflection has been recorded successfully",
    })

    // Reset form
    setAchievements("")
    setChallenges("")
    setInsights("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Daily Reflection</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5 text-yellow-500" />
            <CardTitle>Reflect on Your Day</CardTitle>
          </div>
          <CardDescription>Take a moment to reflect on your progress and learnings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <Label htmlFor="achievements">What went well today?</Label>
            </div>
            <Textarea
              id="achievements"
              placeholder="List your achievements and wins for the day..."
              rows={3}
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-4 w-4 text-red-500" />
              <Label htmlFor="challenges">What challenges did you face?</Label>
            </div>
            <Textarea
              id="challenges"
              placeholder="Describe any obstacles or difficulties you encountered..."
              rows={3}
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <Label htmlFor="insights">What did you learn?</Label>
            </div>
            <Textarea
              id="insights"
              placeholder="Share insights, learnings, or ideas for improvement..."
              rows={3}
              value={insights}
              onChange={(e) => setInsights(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSubmit}>Save Reflection</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
