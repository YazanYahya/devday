import { Button } from "@/src/components/ui/button"
import { MoreHorizontal, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { format } from "date-fns"

interface RecentLogsProps {
  type?: string
  extended?: boolean
}

export default function RecentLogs({ type, extended }: RecentLogsProps) {
  // Mock data - in a real app, this would come from a database
  const logs = [
    {
      id: 1,
      title: "Completed React Native tutorial",
      timestamp: new Date(2025, 3, 17, 10, 30),
      type: "learning",
    },
    {
      id: 2,
      title: "Team standup meeting",
      timestamp: new Date(2025, 3, 17, 9, 0),
      type: "meeting",
    },
    {
      id: 3,
      title: "Fixed critical bug in authentication flow",
      timestamp: new Date(2025, 3, 16, 15, 45),
      type: "task",
    },
  ]

  // Filter logs based on type prop
  const filteredLogs = type ? logs.filter((log) => log.type === type) : logs

  // Limit to 3 logs unless extended is true
  const displayLogs = extended ? filteredLogs : filteredLogs.slice(0, 3)

  if (displayLogs.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">No logs found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayLogs.map((log) => (
        <div
          key={log.id}
          className="group rounded-md border border-transparent bg-transparent p-3 transition-colors hover:border-border hover:bg-accent"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-foreground">{log.title}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{format(log.timestamp, "h:mm a")}</span>
                <span className="mx-1">•</span>
                <span>{format(log.timestamp, "MMM d, yyyy")}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>Edit Log</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Log</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
