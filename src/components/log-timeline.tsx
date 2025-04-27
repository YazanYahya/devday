"use client"

import { CheckCircle, MessageSquare, Users, BookOpen, Plus } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"

interface Activity {
  id: string
  type: string
  description?: string
  status: string
  relatedGoalId?: string
}

interface LogTimelineProps {
  activities: Activity[]
}

export default function LogTimeline({ activities }: LogTimelineProps) {
  // Map the activities from store to log entries for display
  const logs = activities.length > 0 
    ? activities.map(activity => ({
        id: activity.id,
        type: activity.type.toLowerCase(),
        title: activity.description || `${activity.type} activity`,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        completed: activity.status.toLowerCase() === 'completed',
      }))
    : [
      // Fallback mock data if no activities are provided
      {
        id: "1",
        type: "task",
        title: "Fixed checkout flow bug",
        time: "3:15 PM",
        completed: true,
      },
      {
        id: "2",
        type: "feedback",
        title: "Feedback from code review",
        time: "1:45 PM",
        completed: false,
      },
      {
        id: "3",
        type: "meeting",
        title: "Team meeting",
        time: "11:00 AM",
        completed: false,
      },
    ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "learning":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "meeting":
        return <Users className="h-4 w-4 text-amber-500" />
      case "feedback":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-none shadow-lg h-full">
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Activity Log</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-sm gap-1">
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-border"
            >
              <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border">
                {getTypeIcon(log.type)}
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3 bg-card/50 card-hover">
                <div className="flex items-center gap-3">
                  <Checkbox checked={log.completed} className="h-4 w-4" />
                  <span className="text-sm font-medium">{log.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
