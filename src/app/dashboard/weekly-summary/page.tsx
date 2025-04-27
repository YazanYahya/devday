"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  BarChart2,
  Target,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  Users,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"
import { Badge } from "@/src/components/ui/badge"
import { format, subWeeks, addWeeks, startOfWeek, endOfWeek } from "date-fns"
import AIBadge from "@/src/components/ai-badge"

export default function WeeklySummaryPage() {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date())

  const handlePreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1))
  }

  const handleNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1))
  }

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekRange = `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`

  // Mock data - in a real app, this would come from an API
  const weeklyStats = {
    totalActivities: 32,
    completedGoals: 3,
    totalGoals: 5,
    streak: 5,
    focusAreas: [
      { name: "Technical", percentage: 45 },
      { name: "Learning", percentage: 30 },
      { name: "Communication", percentage: 15 },
      { name: "Leadership", percentage: 10 },
    ],
    activityByDay: [
      { day: "Mon", count: 8 },
      { day: "Tue", count: 6 },
      { day: "Wed", count: 4 },
      { day: "Thu", count: 7 },
      { day: "Fri", count: 5 },
      { day: "Sat", count: 1 },
      { day: "Sun", count: 1 },
    ],
    achievements: ["Completed TypeScript Generics module", "5-day activity streak", "First technical presentation"],
    topActivities: [
      { type: "task", count: 15 },
      { type: "learning", count: 10 },
      { type: "meeting", count: 5 },
      { type: "feedback", count: 2 },
    ],
  }

  const isCurrentWeek =
    format(weekStart, "yyyy-MM-dd") === format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd")

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Weekly Summary</h1>
          <p className="text-sm text-muted-foreground">Review your progress and achievements for the week</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="min-w-[240px]">
            <Calendar className="mr-2 h-4 w-4" />
            {weekRange}
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextWeek} disabled={isCurrentWeek}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{weeklyStats.totalActivities}</div>
                <div className="text-xs text-muted-foreground">Total Activities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">
                  {weeklyStats.completedGoals}/{weeklyStats.totalGoals}
                </div>
                <div className="text-xs text-muted-foreground">Goals Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">{weeklyStats.streak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">8.5h</div>
                <div className="text-xs text-muted-foreground">Avg. Daily Activity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Focus Areas</CardTitle>
            <CardDescription>How you've distributed your time this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyStats.focusAreas.map((area) => (
                <div key={area.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{area.name}</span>
                    <span className="text-sm text-muted-foreground">{area.percentage}%</span>
                  </div>
                  <Progress value={area.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity by Day</CardTitle>
            <CardDescription>Your daily activity count for the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[150px] items-end justify-between">
              {weeklyStats.activityByDay.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-1">
                  <div className="w-8 bg-primary/20 rounded-t-sm" style={{ height: `${day.count * 10}px` }} />
                  <span className="text-xs">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones you've reached this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyStats.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Types</CardTitle>
            <CardDescription>Breakdown of your activities by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyStats.topActivities.map((activity) => (
                <div key={activity.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {activity.type === "task" && <CheckCircle className="h-4 w-4 text-primary" />}
                    {activity.type === "learning" && <BookOpen className="h-4 w-4 text-info" />}
                    {activity.type === "meeting" && <Users className="h-4 w-4 text-warning" />}
                    {activity.type === "feedback" && <MessageSquare className="h-4 w-4 text-success" />}
                    <span className="capitalize">{activity.type}s</span>
                  </div>
                  <Badge variant="secondary">{activity.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>AI Insights & Recommendations</CardTitle>
            <AIBadge />
          </div>
          <CardDescription>Personalized insights based on your weekly activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Weekly Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This week you've made excellent progress on your technical skills, particularly with TypeScript. Your
              activity was most consistent on Monday and Thursday, with a noticeable drop during the weekend. You've
              maintained a 5-day streak, which is contributing positively to your consistency score.
            </p>

            <h3 className="font-medium mb-2">Goal Progress</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've completed 3 out of 5 active goals this week, which is above your average pace. Your "Learn
              TypeScript Generics" goal is now 65% complete, showing steady progress. However, your "Improve Technical
              Communication" goal has seen minimal activity and may need more attention.
            </p>

            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Recommendations for Next Week</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Schedule at least 2 hours for your "Technical Communication" goal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Continue your morning learning sessions as they've been most productive
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Consider adding more structured learning time on weekends to maintain momentum
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
