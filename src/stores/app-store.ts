/**
 * App Store
 *
 * Central state management for the DevDay application:
 * - Manages user day status and goals (shared state)
 * - Provides actions for interacting with API services
 * - Handles initialization logic directly
 *
 * @module AppStore
 */
import {create} from 'zustand'
import * as dayService from '@/src/lib/api/day-service'

// Types for internal state management
export type Goal = {
    id: string
    text: string
    completed: boolean
}

export type Day = {
    id: string
    goals: Goal[]
    startedAt: string
    endedAt?: string
}

export type AIPlanItem = {
    id: string
    title: string
    description?: string
    priority: string
    startTime: string
    endTime: string
    status: string
    relatedGoalId?: string
}

export type Activity = {
    id: string
    type: string
    description?: string
    status: string
    relatedGoalId?: string
}

// Simple goal format for API requests
export type GoalInput = string

type AppState = {
    // Day state (shared across components)
    dayStarted: boolean
    dayId: string | null
    goals: Goal[]
    completedGoals: number
    totalGoals: number
    currentStreak: number
    dayData: {
        date?: string
        startTime?: string
        endTime?: string
        notes?: string
        aiPlan?: {
            id: string
            planItems: AIPlanItem[]
        }
        activities: Activity[]
    } | null

    // Status/loading indicators
    isLoading: boolean
    error: string | null

    // Day actions
    checkDayStatus: () => Promise<boolean>
    startDay: (initialGoals: { text: string }[]) => Promise<boolean>
    closeDay: () => Promise<boolean>
    updateGoalStatus: (goalId: string, completed: boolean) => void
    fetchDayData: (dayId: string) => Promise<void>

    // Activity actions
    addActivity: (activityData: { type: string, description: string, details?: string }) => Promise<boolean>

    // Reset error state
    clearError: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
    // Day state
    dayStarted: false,
    dayId: null,
    goals: [],
    completedGoals: 0,
    totalGoals: 0,
    currentStreak: 0,
    dayData: null,

    // Status/loading indicators
    isLoading: true, // Start with loading true as we'll fetch on init
    error: null,

    // Day actions
    checkDayStatus: async () => {
        set({isLoading: true, error: null});

        try {
            // Use the API service instead of direct fetch
            const data = await dayService.getDayStatus();

            // Update the dayStarted status and dayId
            set({
                dayStarted: data.isStarted,
                dayId: data.dayId,
                isLoading: false
            });

            return data.isStarted;
        } catch (error) {
            console.error('Error checking day status:', error);
            set({
                error: 'Failed to load day status',
                isLoading: false
            });
            return false;
        }
    },

    startDay: async (initialGoals) => {
        set({isLoading: true, error: null});

        try {
            // Format goals for API - API expects strings, not objects
            const goalsForApi: string[] = initialGoals.map(goal => goal.text);

            // Use the API service
            const data = await dayService.startDay(goalsForApi);

            if (data.success) {
                // Format goals for local state
                const formattedGoals = initialGoals.map(goal => ({
                    id: crypto.randomUUID(), // Generate temp id for local state management
                    text: goal.text,
                    completed: false
                }));

                set({
                    dayId: data.day.id,
                    goals: formattedGoals,
                    totalGoals: formattedGoals.length,
                    completedGoals: 0,
                    dayStarted: true,
                    isLoading: false
                });

                // Fetch complete day data
                await get().fetchDayData(data.day.id);

                return true;
            }

            set({
                error: 'Failed to start day',
                isLoading: false
            });
            return false;
        } catch (error) {
            console.error('Error starting day:', error);
            set({
                error: 'An error occurred',
                isLoading: false
            });
            return false;
        }
    },

    fetchDayData: async (dayId) => {
        set({isLoading: true, error: null});

        try {
            const data = await dayService.getDayData(dayId);

            if (data.success) {
                // Transform API response to match our local state structure
                const goals = data.goals.map(goal => ({
                    id: goal.id,
                    text: goal.description,
                    completed: goal.status === 'COMPLETED'
                }));

                const completedGoals = goals.filter(goal => goal.completed).length;

                // Format AI plan if exists
                let aiPlan = undefined;
                if (data.aiPlan) {
                    aiPlan = {
                        id: data.aiPlan.id,
                        planItems: data.aiPlan.planItems.map(item => ({
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            priority: item.priority,
                            startTime: item.start_time,
                            endTime: item.end_time,
                            status: item.status
                        }))
                    };
                }

                // Format activities
                const activities = data.activities.map(activity => ({
                    id: activity.id,
                    type: activity.type,
                    description: activity.description,
                    status: activity.status,
                    relatedGoalId: activity.related_goal_id
                }));

                set({
                    dayId: data.day.id,
                    goals,
                    completedGoals,
                    totalGoals: goals.length,
                    dayStarted: true,
                    dayData: {
                        date: data.day.date,
                        startTime: data.day.start_time,
                        endTime: data.day.end_time,
                        notes: data.day.notes,
                        aiPlan,
                        activities
                    },
                    isLoading: false
                });
            } else {
                throw new Error('Failed to fetch day data');
            }
        } catch (error) {
            console.error('Error fetching day data:', error);
            set({
                error: 'Failed to load day data',
                isLoading: false
            });
        }
    },

    closeDay: async () => {
        const {dayId, completedGoals, totalGoals} = get();

        if (!dayId) return false;

        set({isLoading: true, error: null});

        try {
            // Use the API service instead of direct fetch
            const data = await dayService.endDay(dayId, completedGoals, totalGoals);

            if (data.success) {
                set({
                    dayStarted: false,
                    goals: [],
                    completedGoals: 0,
                    totalGoals: 0,
                    dayId: null,
                    dayData: null,
                    isLoading: false
                });
                return true;
            }

            set({
                error: 'Failed to close day',
                isLoading: false
            });
            return false;
        } catch (error) {
            console.error('Error closing day:', error);
            set({
                error: 'An error occurred',
                isLoading: false
            });
            return false;
        }
    },

    updateGoalStatus: (goalId, completed) => {
        set(state => {
            const updatedGoals = state.goals.map(goal =>
                goal.id === goalId ? {...goal, completed} : goal
            );

            return {
                goals: updatedGoals,
                completedGoals: updatedGoals.filter(g => g.completed).length
            };
        });
    },

    // Clear error
    clearError: () => set({error: null}),

    // Add activity function
    addActivity: async (activityData) => {
        const {dayId} = get();

        if (!dayId) return false;

        set({isLoading: true, error: null});

        try {
            // Use the API service instead of direct fetch
            const data = await dayService.addActivity(
                dayId,
                activityData.type,
                activityData.description,
                activityData.details
            );

            if (data.success) {
                // Update local state with the new activity
                set(state => {
                    // Create a new activity object
                    const newActivity: Activity = {
                        id: data.activity.id,
                        type: activityData.type,
                        description: activityData.description,
                        status: 'COMPLETED'
                    };

                    // Add to the activities array in dayData
                    return {
                        dayData: state.dayData ? {
                            ...state.dayData,
                            activities: [newActivity, ...(state.dayData.activities || [])]
                        } : null,
                        isLoading: false
                    };
                });

                return true;
            }

            set({
                error: data.error || 'Failed to add activity',
                isLoading: false
            });
            return false;

        } catch (error) {
            console.error('Error adding activity:', error);
            set({
                error: 'Failed to add activity',
                isLoading: false
            });
            return false;
        }
    }
})); 