"use client"

import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import StartDayCard, {type Goal} from "@/src/components/start-day-card"
import CloseDayDialog from "@/src/components/close-day-dialog"
import DailyProgressSummary from "@/src/components/daily-progress-summary"
import LogTimeline from "@/src/components/log-timeline"
import AIDailyPlan from "@/src/components/ai-daily-plan"
import {useAuth} from "@/src/contexts/auth-context"
import {useAppStore} from "@/src/stores/app-store"

export default function DashboardPage() {
    const {user} = useAuth()

    // Get shared state from the store
    const {
        dayStarted,
        dayId,
        goals,
        dayData,
        completedGoals,
        totalGoals,
        currentStreak,
        isLoading,
        error,
        checkDayStatus,
        fetchDayData,
        startDay,
        closeDay,
        clearError
    } = useAppStore()

    // Local UI state for dialog
    const [showCloseDayDialog, setShowCloseDayDialog] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)

    // Use user's name if available, otherwise use "there" for a friendly greeting
    const userName = user?.user_metadata?.name || "there"

    // Use useEffect to initialize dashboard properly
    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                setInitialLoading(true)

                // First check if day is already started
                const isDayStarted = await checkDayStatus()

                // If day is already started, and we have a day ID, fetch day data
                if (isDayStarted && dayId) {
                    await fetchDayData(dayId)
                }
            } catch (error) {
                console.error("Error initializing dashboard:", error)
            } finally {
                setInitialLoading(false)
            }
        }

        if (user) {
            initializeDashboard()
        }
    }, [user, checkDayStatus, fetchDayData, dayId])

    const handleStartDay = async (initialGoals: Goal[]) => {
        if (!user) return

        // Format goals for the API - pass simple objects with text property
        const formattedGoals = initialGoals.map(goal => ({
            text: goal.text
        }))

        await startDay(formattedGoals)
    }

    const handleCloseDay = () => {
        setShowCloseDayDialog(true)
    }

    const handleCloseDayConfirm = async () => {
        if (!user) return
        const success = await closeDay()
        if (success) {
            setShowCloseDayDialog(false)
        }
    }

    // Show loading state while initializing
    if (initialLoading || isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                    <button
                        onClick={clearError}
                        className="mt-2 bg-red-700 text-white px-4 py-2 rounded"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto max-w-7xl h-full p-4">
            <AnimatePresence mode="wait">
                {!dayStarted ? (
                    <motion.div
                        key="start-day"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        <StartDayCard onStartDay={handleStartDay} userName={userName}/>
                    </motion.div>
                ) : (
                    <motion.div
                        key="day-started"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        className="h-full"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
                            {/* Left panel with Progress Summary and Timeline */}
                            <div className="md:col-span-5 flex flex-col gap-4 h-full">
                                <div className="flex-shrink-0 max-h-[230px]">
                                    <DailyProgressSummary
                                        streak={currentStreak}
                                        goalsCompleted={completedGoals}
                                        totalGoals={totalGoals}
                                        onCloseDay={handleCloseDay}
                                    />
                                </div>

                                <div className="flex-grow min-h-0 overflow-hidden">
                                    <LogTimeline
                                        activities={dayData?.activities || []}
                                    />
                                </div>
                            </div>

                            {/* Right panel with AI Daily Plan */}
                            <div className="md:col-span-7 flex h-full">
                                <div className="w-full">
                                    <AIDailyPlan
                                        goals={goals}
                                        aiPlan={dayData?.aiPlan || null}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Close Day Dialog */}
            <CloseDayDialog
                open={showCloseDayDialog}
                onClose={() => setShowCloseDayDialog(false)}
                onConfirm={handleCloseDayConfirm}
                completedGoals={completedGoals}
                totalGoals={totalGoals}
            />
        </div>
    )
}
