import {SupabaseClient} from '@supabase/supabase-js';
import type {
    ActivityInsert,
    ActivityUpdate,
    Database,
    DayInsert,
    DayUpdate,
    GoalInsert,
    GoalUpdate,
    AIPlanInsert,
    PlanItemInsert
} from '@/src/lib/supabase/types';

// Type for the Supabase client
type SupabaseClientType = SupabaseClient<Database>;

// Database utility functions for Goals
export const goalsService = {
    // Get all goals for a user
    async getGoals(supabase: SupabaseClientType, userId: string) {
        return supabase
            .from('goals')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', {ascending: false});
    },

    // Get a specific goal by ID
    async getGoalById(supabase: SupabaseClientType, goalId: string) {
        return supabase
            .from('goals')
            .select('*')
            .eq('id', goalId)
            .single();
    },

    // Create a new goal
    async createGoal(supabase: SupabaseClientType, goal: GoalInsert) {
        return supabase
            .from('goals')
            .insert(goal)
            .select()
            .single();
    },

    // Update an existing goal
    async updateGoal(supabase: SupabaseClientType, goalUpdate: GoalUpdate) {
        const {id, ...updates} = goalUpdate;
        return supabase
            .from('goals')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
    },

    // Delete a goal
    async deleteGoal(supabase: SupabaseClientType, goalId: string) {
        return supabase
            .from('goals')
            .delete()
            .eq('id', goalId);
    },

    // Get goals for a specific date
    async getGoalsByDate(supabase: SupabaseClientType, userId: string, date: string) {
        return supabase
            .from('goals')
            .select('*')
            .eq('user_id', userId)
            .eq('start_date', date)
            .eq('type', 'daily')
            .order('created_at', {ascending: true});
    }
};

// Database utility functions for Day Entries
export const daysService = {
    // Get a day for a specific date and user
    async getDay(supabase: SupabaseClientType, userId: string, date: string) {
        const {data, error} = await supabase
            .from('days')
            .select('*')
            .eq('user_id', userId)
            .eq('date', date);

        // If multiple entries exist, return the first one
        return {
            data: data && data.length > 0 ? data[0] : null,
            error
        };
    },

    // Get a day by ID
    async getDayById(supabase: SupabaseClientType, dayId: string, userId: string) {
        return supabase
            .from('days')
            .select('*')
            .eq('id', dayId)
            .eq('user_id', userId)
            .single();
    },

    // Check if a day has been started without retrieving the full entry
    async isDayStarted(supabase: SupabaseClientType, userId: string) {
        const today = new Date().toISOString().split('T')[0]

        const {data, error} = await supabase
            .from('days')
            .select('id')
            .eq('status', 'started')
            .eq('user_id', userId)
            .eq('date', today)
            .maybeSingle();

        return {
            isStarted: data !== null,
            dayId: data?.id || null,
            error
        };
    },

    // Start a new day
    async startDay(supabase: SupabaseClientType, day: DayInsert) {
        return supabase
            .from('days')
            .insert(day)
            .select()
            .single();
    },

    // Update an existing day
    async updateDay(supabase: SupabaseClientType, dayUpdate: DayUpdate) {
        const {id, ...updates} = dayUpdate;
        return supabase
            .from('days')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
    },

    // Get recent day entries
    async getRecentDayEntries(supabase: SupabaseClientType, userId: string, limit = 7) {
        return supabase
            .from('days')
            .select('*')
            .eq('user_id', userId)
            .order('date', {ascending: false})
            .limit(limit);
    }
};

// Database utility functions for Activities
export const activitiesService = {
    // Get activities for a specific day
    async getActivitiesByDayId(supabase: SupabaseClientType, dayId: string) {
        return supabase
            .from('activities')
            .select('*')
            .eq('day_id', dayId);
    },

    // Create a new activity
    async createActivity(supabase: SupabaseClientType, activity: ActivityInsert) {
        return supabase
            .from('activities')
            .insert(activity)
            .select()
            .single();
    },

    // Update an existing activity
    async updateActivity(supabase: SupabaseClientType, activityUpdate: ActivityUpdate) {
        const {id, ...updates} = activityUpdate;
        return supabase
            .from('activities')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
    },

    // Delete an activity
    async deleteActivity(supabase: SupabaseClientType, activityId: string) {
        return supabase
            .from('activities')
            .delete()
            .eq('id', activityId);
    },

    // Get activities related to a specific goal
    async getActivitiesByGoalId(supabase: SupabaseClientType, goalId: string) {
        return supabase
            .from('activities')
            .select('*')
            .eq('related_goal_id', goalId)
            .order('start_time', {ascending: false});
    }
};

// Database utility functions for AI Plans and Plan Items
export const aiPlanService = {
    // Get AI plan for a specific day
    async getAIPlanByDayId(supabase: SupabaseClientType, dayId: string) {
        const {data, error} = await supabase
            .from('ai_plans')
            .select('*')
            .eq('day_id', dayId)
            .order('created_at', {ascending: false})
            .limit(1);

        return {
            data: data && data.length > 0 ? data[0] : null,
            error
        };
    },

    // Get plan items for a specific AI plan
    async getPlanItemsByPlanId(supabase: SupabaseClientType, planId: string) {
        return supabase
            .from('plan_items')
            .select('*')
            .eq('plan_id', planId)
            .order('start_time', {ascending: true});
    },

    // Create a new AI plan
    async createAIPlan(supabase: SupabaseClientType, plan: AIPlanInsert) {
        return supabase
            .from('ai_plans')
            .insert(plan)
            .select()
            .single();
    },

    // Create multiple plan items at once
    async createPlanItems(supabase: SupabaseClientType, planItems: PlanItemInsert[]) {
        return supabase
            .from('plan_items')
            .insert(planItems)
            .select();
    },

    // Update a plan item
    async updatePlanItem(supabase: SupabaseClientType, planItemId: string, updates: Partial<PlanItemInsert>) {
        return supabase
            .from('plan_items')
            .update(updates)
            .eq('id', planItemId)
            .select()
            .single();
    },

    // Delete a plan item
    async deletePlanItem(supabase: SupabaseClientType, planItemId: string) {
        return supabase
            .from('plan_items')
            .delete()
            .eq('id', planItemId);
    }
}; 