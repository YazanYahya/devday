export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

// Enum types
export enum GoalType {
    YEARLY = 'yearly',
    QUARTERLY = 'quarterly',
    MONTHLY = 'monthly',
    WEEKLY = 'weekly',
    DAILY = 'daily'
}

export enum GoalStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    ABANDONED = 'abandoned'
}

export enum DayStatus {
    STARTED = 'started',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export enum ActivityType {
    TASK = 'task',
    MEETING = 'meeting',
    LEARNING = 'learning',
    FEEDBACK = 'feedback',
    REFLECTION = 'reflection'
}

export enum ActivityStatus {
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    BLOCKED = 'blocked'
}

export enum PlanItemStatus {
    SCHEDULED = 'scheduled',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    SKIPPED = 'skipped'
}

// Goal table type
export interface Goal {
    id: string;
    user_id: string;
    description: string | null;
    type: GoalType;
    status: GoalStatus;
    start_date: string; // ISO date string
    end_date?: string | null; // ISO date string
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// Day Entry table type
export interface Day {
    id: string;
    user_id: string;
    date: string; // ISO date string
    status: DayStatus;
    start_time: string; // ISO timestamp
    end_time?: string | null; // ISO timestamp
    notes?: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// AI Plan table type
export interface AIPlan {
    id: string;
    day_id: string;
    user_id: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// Plan Item table type
export interface PlanItem {
    id: string;
    plan_id: string;
    title: string;
    description: string | null;
    priority: 'low' | 'medium' | 'high';
    start_time: string; // TIME format (HH:MM:SS)
    end_time: string; // TIME format (HH:MM:SS)
    status: PlanItemStatus;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// Activity table type
export interface Activity {
    id: string;
    day_id: string;
    user_id: string;
    type: ActivityType;
    description: string | null;
    related_goal_id: string | null;
    status: ActivityStatus;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

// Type for inserting a new goal (omitting auto-generated fields)
export type GoalInsert = Omit<Goal, 'id' | 'created_at' | 'updated_at'>;

// Type for updating a goal (all fields optional except id)
export type GoalUpdate = Partial<Omit<Goal, 'id'>> & { id: string };

// Type for inserting a new day
export type DayInsert = Omit<Day, 'id' | 'created_at' | 'updated_at'>;

// Type for updating a day
export type DayUpdate = Partial<Omit<Day, 'id'>> & { id: string };

// Type for inserting a new AI plan
export type AIPlanInsert = Omit<AIPlan, 'id' | 'created_at' | 'updated_at'>;

// Type for updating an AI plan
export type AIPlanUpdate = Partial<Omit<AIPlan, 'id'>> & { id: string };

// Type for inserting a new plan item
export type PlanItemInsert = Omit<PlanItem, 'id' | 'created_at' | 'updated_at'>;

// Type for updating a plan item
export type PlanItemUpdate = Partial<Omit<PlanItem, 'id'>> & { id: string };

// Type for inserting a new activity
export type ActivityInsert = Omit<Activity, 'id' | 'created_at' | 'updated_at'>;

// Type for updating an activity
export type ActivityUpdate = Partial<Omit<Activity, 'id'>> & { id: string };

export type WaitlistEntry = {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
};

export type WaitlistInsert = Omit<WaitlistEntry, 'id' | 'created_at' | 'updated_at'>;

// Database schema type definition for Supabase
export interface Database {
    devday: {
        Tables: {
            goals: {
                Row: Goal;
                Insert: GoalInsert;
                Update: GoalUpdate;
            };
            days: {
                Row: Day;
                Insert: DayInsert;
                Update: DayUpdate;
            };
            ai_plans: {
                Row: AIPlan;
                Insert: AIPlanInsert;
                Update: AIPlanUpdate;
            };
            plan_items: {
                Row: PlanItem;
                Insert: PlanItemInsert;
                Update: PlanItemUpdate;
            };
            activities: {
                Row: Activity;
                Insert: ActivityInsert;
                Update: ActivityUpdate;
            };
            waitlist: {
                Row: WaitlistEntry;
                Insert: WaitlistInsert;
                Update: WaitlistInsert;
            };
        };
        Views: {};
        Functions: {};
        Enums: {
            goal_type: GoalType;
            goal_status: GoalStatus;
            day_status: DayStatus;
            activity_type: ActivityType;
            activity_status: ActivityStatus;
            priority_level: 'low' | 'medium' | 'high';
            plan_item_status: PlanItemStatus;
        };
    };
} 