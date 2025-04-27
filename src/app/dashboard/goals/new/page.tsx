"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Calendar as CalendarComponent } from "@/src/components/ui/calendar"
import { format } from "date-fns"
import Link from "next/link"
import AIBadge from "@/src/components/ai-badge"

export default function NewGoalPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [timeframe, setTimeframe] = useState("")
  const [date, setDate] = useState<Date>()
  const [measurable, setMeasurable] = useState("")

  const handleSubmit = () => {
    // In a real app, this would save the goal to the database
    console.log({
      title,
      description,
      category,
      timeframe,
      dueDate: date,
      measurable,
    })

    // Redirect to goals page
    window.location.href = "/dashboard/goals"
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/dashboard/goals">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-medium tracking-tight">Create New Goal</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Details</CardTitle>
          <CardDescription>Define your new goal and set parameters for tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="e.g., Learn React Native"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal and what you want to achieve"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="measurable">Measurable Outcome</Label>
            <Input
              id="measurable"
              placeholder="e.g., Build 3 complete apps"
              value={measurable}
              onChange={(e) => setMeasurable(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Define a clear, measurable outcome to track your progress</p>
          </div>

          <div className="rounded-md border p-3 bg-muted/30">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">AI Suggestions</span>
                  <AIBadge size="sm" variant="subtle" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Based on your selected category and timeframe, consider these measurable outcomes:
                </p>
                <div className="space-y-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs h-auto py-1.5"
                    onClick={() => setMeasurable("Complete 3 courses and build 1 project")}
                  >
                    Complete 3 courses and build 1 project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs h-auto py-1.5"
                    onClick={() => setMeasurable("Contribute to 2 open source projects")}
                  >
                    Contribute to 2 open source projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard/goals">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSubmit} disabled={!title || !category || !timeframe || !date}>
            Create Goal
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
