"use client"

import { useState } from "react"
import { Plus, Target, Calendar, Clock, CheckCircle, MoreHorizontal, Sparkles } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import Link from "next/link"
import AIBadge from "@/src/components/ai-badge"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  timeframe: string
  progress: number
  dueDate: string
  isCompleted: boolean
}

export default function GoalsPage() {
  // Mock data - in a real app, this would come from an API
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Learn TypeScript Generics",
      description: "Master advanced TypeScript concepts including generics, utility types, and type inference",
      category: "technical",
      timeframe: "quarterly",
      progress: 65,
      dueDate: "2025-06-30",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Improve Technical Communication",
      description: "Give 5 technical presentations to the team and write 3 blog posts",
      category: "communication",
      timeframe: "yearly",
      progress: 30,
      dueDate: "2025-12-31",
      isCompleted: false,
    },
    {
      id: "3",
      title: "Build a Side Project with Next.js",
      description: "Create and launch a personal project using Next.js, TypeScript, and a modern UI library",
      category: "learning",
      timeframe: "quarterly",
      progress: 80,
      dueDate: "2025-06-30",
      isCompleted: false,
    },
    {
      id: "4",
      title: "Lead a Team Project",
      description: "Take ownership of a project and lead a small team to successful delivery",
      category: "leadership",
      timeframe: "yearly",
      progress: 15,
      dueDate: "2025-12-31",
      isCompleted: false,
    },
    {
      id: "5",
      title: "Learn GraphQL Fundamentals",
      description: "Complete GraphQL course and implement in a small project",
      category: "technical",
      timeframe: "monthly",
      progress: 100,
      dueDate: "2025-04-30",
      isCompleted: true,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [timeframeFilter, setTimeframeFilter] = useState("all")

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "communication":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "learning":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "leadership":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case "daily":
        return <Clock className="h-4 w-4" />
      case "weekly":
        return <Calendar className="h-4 w-4" />
      case "monthly":
        return <Calendar className="h-4 w-4" />
      case "quarterly":
        return <Target className="h-4 w-4" />
      case "yearly":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredGoals = goals.filter((goal) => {
    // Search filter
    if (searchQuery && !goal.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (categoryFilter !== "all" && goal.category !== categoryFilter) {
      return false
    }

    // Timeframe filter
    if (timeframeFilter !== "all" && goal.timeframe !== timeframeFilter) {
      return false
    }

    return true
  })

  const activeGoals = filteredGoals.filter((goal) => !goal.isCompleted)
  const completedGoals = filteredGoals.filter((goal) => goal.isCompleted)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Goals</h1>
          <p className="text-sm text-muted-foreground">Track and manage your professional development goals</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/goals/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Goal
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{goals.length}</div>
                <div className="text-xs text-muted-foreground">Total Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">{completedGoals.length}</div>
                <div className="text-xs text-muted-foreground">Completed Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">{activeGoals.length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search" className="text-xs">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category" className="text-xs">
                Category
              </Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeframe" className="text-xs">
                Timeframe
              </Label>
              <Select value={timeframeFilter} onValueChange={setTimeframeFilter}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="All Timeframes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Timeframes</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeGoals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground mb-2">No active goals found</p>
                <Link href="/dashboard/goals/new">
                  <Button variant="outline" size="sm">
                    Create a New Goal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedGoals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">No completed goals yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {completedGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {filteredGoals.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Target className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground mb-2">No goals found</p>
                <Link href="/dashboard/goals/new">
                  <Button variant="outline" size="sm">
                    Create a New Goal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 rounded-lg border p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">AI Goal Suggestions</h3>
              <AIBadge variant="subtle" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your activity and current goals, here are some suggestions for new goals:
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <Button variant="outline" className="justify-start text-left h-auto py-2">
                <div>
                  <div className="font-medium">Learn Docker & Kubernetes</div>
                  <div className="text-xs text-muted-foreground">Aligns with your Technical Skills focus</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start text-left h-auto py-2">
                <div>
                  <div className="font-medium">Contribute to Open Source</div>
                  <div className="text-xs text-muted-foreground">Builds on your TypeScript and React skills</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoalCard({ goal }: { goal: Goal }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "communication":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "learning":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "leadership":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getTimeframeIcon = (timeframe: string) => {
    switch (timeframe) {
      case "daily":
        return <Clock className="h-4 w-4" />
      case "weekly":
        return <Calendar className="h-4 w-4" />
      case "monthly":
        return <Calendar className="h-4 w-4" />
      case "quarterly":
        return <Target className="h-4 w-4" />
      case "yearly":
        return <Target className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-medium">{goal.title}</h3>
              <Badge variant="outline" className={getCategoryColor(goal.category)}>
                {goal.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-1.5" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                {getTimeframeIcon(goal.timeframe)}
                <span className="capitalize">{goal.timeframe}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDueDate(goal.dueDate)}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Goal</DropdownMenuItem>
              {goal.isCompleted ? (
                <DropdownMenuItem>Mark as Active</DropdownMenuItem>
              ) : (
                <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">Delete Goal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
