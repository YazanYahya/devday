/**
 * Day-related API services
 * 
 * This module contains all API calls related to day management:
 * - status checking
 * - day starting/ending
 * - goal management
 */
import { GoalInput } from '@/src/stores/app-store';
import { 
  DayStatusResponse, 
  DayStartResponse, 
  DayEndResponse,
  DayDataResponse
} from './types';
import { SupabaseClientType } from '@supabase/supabase-js';

/**
 * Check if the user has already started their day
 * @returns {Promise<DayStatusResponse>} A promise that resolves to {isStarted: boolean, dayId: string | null}
 */
export const getDayStatus = async (): Promise<DayStatusResponse> => {
  const response = await fetch('/api/day/status');
  if (!response.ok) {
    throw new Error('Failed to fetch day status');
  }
  
  return response.json();
};

/**
 * Start a new day with initial goals
 */
export const startDay = async (goals: string[]): Promise<DayStartResponse> => {
  const response = await fetch('/api/day/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ goals })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to start day');
  }
  
  return response.json();
};

/**
 * End the current day
 */
export const endDay = async (
  dayId: string, 
  completedGoals: number, 
  totalGoals: number
): Promise<DayEndResponse> => {
  const response = await fetch('/api/day/end', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      dayId,
      completedGoals,
      totalGoals
    })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to end day');
  }
  
  return response.json();
};

/**
 * Get day data by ID including goals, AI plans, and activities
 */
export const getDayData = async (dayId: string): Promise<DayDataResponse> => {
  const response = await fetch(`/api/day/${dayId}`);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to get day data');
  }
  
  return response.json();
};

async function isDayStarted(supabase: SupabaseClientType, userId: string) {
  const today = new Date().toISOString().split('T')[0]

  // Updated to get the actual row data instead of just count
  const {data, error} = await supabase
    .from('days')
    .select('id')
    .eq('user_id', userId)
    .eq('date', today)
    .maybeSingle();

  return {
    isStarted: data !== null,
    dayId: data?.id || null,
    error
  };
} 