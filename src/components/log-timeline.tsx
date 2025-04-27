"use client"

import {Plus} from "lucide-react"
import {useState} from "react"
import {Button} from "@/src/components/ui/button"
import {motion} from "framer-motion"
import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card"
import ActivityLogDialog from "@/src/components/activity-log-dialog"

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

export default function LogTimeline({activities}: LogTimelineProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Map the activities from store to log entries for display
    const logs = activities.map(activity => ({
        id: activity.id,
        type: activity.type.toLowerCase(),
        title: activity.description || `${activity.type} activity`,
        time: new Date().toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true}),
        completed: activity.status.toLowerCase() === 'completed',
    }))

    return (
        <Card className="border-none shadow-lg h-full">
            <CardHeader className="pb-2 pt-6 px-6">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">Activity Log</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-sm gap-1"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <Plus className="h-3.5 w-3.5"/> Add
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {logs.length > 0 ? (
                    <div className="space-y-4">
                        {logs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                initial={{opacity: 0, x: 10}}
                                animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.3, delay: index * 0.1}}
                                className="relative pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-border"
                            >
                                <div
                                    className="absolute left-0 top-1 h-4 w-4 rounded-full bg-background border border-primary"></div>
                                <div
                                    className="flex items-center justify-between rounded-lg border p-3 bg-card/50 card-hover">
                                    <span className="text-sm font-medium">{log.title}</span>
                                    <span className="text-xs text-muted-foreground">{log.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-32 text-muted-foreground">
                        No activities logged yet
                    </div>
                )}
            </CardContent>

            {/* Use shared ActivityLogDialog component */}
            <ActivityLogDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </Card>
    )
}
