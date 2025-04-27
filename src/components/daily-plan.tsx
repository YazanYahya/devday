import { Badge } from "@/src/components/ui/badge"
import { Checkbox } from "@/src/components/ui/checkbox"
import { Separator } from "@/src/components/ui/separator"
import { Clock, Target } from "lucide-react"

export default function DailyPlan() {
  // Mock data - in a real app, this would come from an AI-generated plan
  const plan = {
    focus: "Technical Skills & Communication",
    timeBlocks: [
      {
        id: 1,
        time: "9:00 AM - 10:30 AM",
        title: "React Native Learning",
        description: "Complete the animations module in the React Native course",
        priority: "high",
        relatedGoal: "Learn React Native",
      },
      {
        id: 2,
        time: "10:30 AM - 11:00 AM",
        title: "Team Standup",
        description: "Daily team meeting to discuss progress and blockers",
        priority: "medium",
        relatedGoal: null,
      },
      {
        id: 3,
        time: "11:00 AM - 12:30 PM",
        title: "Code Review",
        description: "Review pull requests from team members",
        priority: "medium",
        relatedGoal: null,
      },
      {
        id: 4,
        time: "1:30 PM - 3:30 PM",
        title: "Feature Implementation",
        description: "Work on the authentication flow for the mobile app",
        priority: "high",
        relatedGoal: null,
      },
      {
        id: 5,
        time: "3:30 PM - 4:30 PM",
        title: "Presentation Preparation",
        description: "Prepare slides for tomorrow's technical presentation",
        priority: "high",
        relatedGoal: "Improve Communication Skills",
      },
      {
        id: 6,
        time: "4:30 PM - 5:00 PM",
        title: "Daily Reflection",
        description: "Review today's progress and plan for tomorrow",
        priority: "medium",
        relatedGoal: null,
      },
    ],
    recommendations: [
      "Focus on completing the React Native animations module to stay on track with your learning goal",
      "Spend extra time on presentation preparation to improve your communication skills",
      "Consider delegating some code review tasks to make time for your high-priority items",
    ],
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/40 p-4">
        <div className="flex items-center gap-2 font-medium">
          <Target className="h-4 w-4 text-primary" />
          <span>Today's Focus: {plan.focus}</span>
        </div>
      </div>

      <div className="space-y-4">
        {plan.timeBlocks.map((block) => (
          <div key={block.id} className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Checkbox id={`block-${block.id}`} className="mt-1" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <label htmlFor={`block-${block.id}`} className="font-medium cursor-pointer">
                    {block.title}
                  </label>
                  <Badge variant={getPriorityVariant(block.priority)}>{block.priority}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{block.description}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{block.time}</span>
                  </div>
                  {block.relatedGoal && (
                    <Badge variant="outline" className="text-xs">
                      Goal: {block.relatedGoal}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-medium">Recommendations</h3>
        <ul className="space-y-2">
          {plan.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "outline"
  }
}
