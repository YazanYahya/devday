/**
 * API Response Types
 *
 * Type definitions for API responses to ensure type safety across the application
 */

// Day Status API Response
export type DayStatusResponse = {
    isStarted: boolean;
    dayId: string | null;
};

// Day Start API Response
export type DayStartResponse = {
    success: boolean;
    day: {
        id: string;
    };
};

// Day End API Response
export type DayEndResponse = {
    success: boolean;
    day: {
        id: string;
        status: string;
        end_time: string;
        notes: string;
    };
};

// Day Data API Response
export type DayDataResponse = {
    success: boolean;
    day: {
        id: string;
        date: string;
        status: string;
        start_time: string;
        end_time?: string;
        notes?: string;
    };
    goals: Array<{
        id: string;
        description: string;
        status: string;
    }>;
    aiPlan?: {
        id: string;
        planItems: Array<{
            id: string;
            title: string;
            description?: string;
            priority: string;
            start_time: string;
            end_time: string;
            status: string;
        }>;
    };
    activities: Array<{
        id: string;
        type: string;
        description?: string;
        status: string;
        related_goal_id?: string;
    }>;
};

// Error Response
export type ApiErrorResponse = {
    error: string;
}; 