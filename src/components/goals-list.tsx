import { Button } from "@/src/components/ui/button"
import { MoreHorizontal, ArrowUpRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import Link from "next/link"

interface GoalsListProps {
  completed?: boolean
  all?: boolean
}

export default function GoalsList({ completed, all }: GoalsListProps) {
  // Mock data - in a real app, this would come from a database
  const goals = [
    {
      id: 1,
      title: "Learn React Native",
      description: "Build 3 complete mobile applications",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Improve Communication Skills",
      description: "Give 5 technical presentations to the team",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Master TypeScript",
      description: "Complete advanced TypeScript course and apply in projects",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Learn GraphQL",
      description: "Build a full-stack application with GraphQL",
      isCompleted: true,
    },
  ]

  // Filter goals based on props
  const filteredGoals = goals.filter((goal) => {
    if (completed) return goal.isCompleted
    if (!all && !completed) return !goal.isCompleted
    return true
  })

  if (filteredGoals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">No goals found</p>
        <Link href="/dashboard/goals/new">
          <Button variant="outline" className="mt-2 text-xs">
            Create a New Goal
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredGoals.map((goal) => (
        <div
          key={goal.id}
          className="group rounded-md border border-transparent bg-transparent p-3 transition-colors hover:border-border hover:bg-accent"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-foreground">{goal.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{goal.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Goal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <span>View Details</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
