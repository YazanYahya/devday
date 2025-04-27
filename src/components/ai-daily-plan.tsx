"use client"

import {Clock, Sparkles, Target} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/src/components/ui/card"
import {Badge} from "@/src/components/ui/badge"
import AIBadge from "@/src/components/ai-badge"
import type {Goal} from "@/src/components/start-day-card"
import {motion} from "framer-motion"

interface TimeBlock {
    id: string
    time: string
    title: string
    description: string
    priority: "high" | "medium" | "low"
    relatedGoalId?: string
}

interface AIPlan {
    id: string
    planItems: {
        id: string
        title: string
        description?: string
        priority: string
        startTime: string
        endTime: string
        status: string
        relatedGoalId?: string
    }[]
}

interface AIDailyPlanProps {
    goals: Goal[]
    aiPlan: AIPlan | null
}

export default function AIDailyPlan({goals, aiPlan}: AIDailyPlanProps) {
    // Transform API plan items to TimeBlock format
    const timeBlocks: TimeBlock[] = aiPlan
        ? aiPlan.planItems.map(item => ({
            id: item.id,
            time: `${formatTime(item.startTime)} - ${formatTime(item.endTime)}`,
            title: item.title,
            description: item.description || "",
            priority: item.priority.toLowerCase() as "high" | "medium" | "low",
            relatedGoalId: item.relatedGoalId,
        }))
        : [];

    const getPriorityVariant = (priority: string) => {
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

    const getRelatedGoal = (goalId?: string) => {
        if (!goalId) return null
        return goals.find((goal) => goal.id === goalId)
    }

    function formatTime(timeString: string): string {
        try {
            // Check if timeString is a time string like "09:30:00"
            if (timeString.includes(':')) {
                const [hours, minutes] = timeString.split(':');
                const hour = parseInt(hours, 10);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const formattedHour = hour % 12 || 12;
                return `${formattedHour}:${minutes} ${ampm}`;
            }
            // Try parsing as ISO date string
            else {
                const date = new Date(timeString);
                if (isNaN(date.getTime())) return timeString;

                return date.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
            }
        } catch (e) {
            return timeString;
        }
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="ai-glow h-full"
        >
            <Card className="h-full border-none shadow-lg flex flex-col">
                <CardHeader className="pb-2 pt-6 px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl font-bold">Today's Plan</CardTitle>
                            <AIBadge size="sm"/>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 inline-block mr-1"/>
                        AI-generated schedule based on your goals
                    </p>
                </CardHeader>
                <CardContent className="p-6 space-y-4 overflow-auto flex-1">
                    {timeBlocks.length > 0 ? (
                        timeBlocks.map((block, index) => (
                            <motion.div
                                key={block.id}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: index * 0.1}}
                            >
                                <Card className="overflow-hidden card-hover border bg-card/50">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1">
                                                    <h3 className="font-medium text-base truncate">{block.title}</h3>
                                                    <Badge variant={getPriorityVariant(block.priority)}
                                                           className="text-xs">
                                                        {block.priority === "high" ? "High" : block.priority === "medium" ? "Medium" : "Low"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{block.description}</p>
                                                <div
                                                    className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="h-3.5 w-3.5"/>
                                                        <span>{block.time}</span>
                                                    </div>
                                                    {block.relatedGoalId && getRelatedGoal(block.relatedGoalId) && (
                                                        <div className="flex items-center gap-1.5 truncate">
                                                            <Target className="h-3.5 w-3.5 flex-shrink-0"/>
                                                            <span
                                                                className="truncate">{getRelatedGoal(block.relatedGoalId)?.text}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10 px-6">
                            <div
                                className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-muted-foreground"/>
                            </div>
                            <h3 className="mb-1 text-lg font-medium">No Plan Available</h3>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                Your AI-generated daily plan will appear here once your goals are processed.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
