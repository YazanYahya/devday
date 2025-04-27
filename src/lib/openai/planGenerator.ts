import {openai} from './client';
import {PlanItemInsert, PlanItemStatus} from '@/src/lib/supabase/types';

export interface GeneratedPlanItem {
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    start_time: string;
    end_time: string;
}

/**
 * Generates a plan of items for the day based on the provided goals
 * @param goals Array of goal descriptions
 * @returns Array of plan items that can be inserted into the database
 */
export async function generateAIPlanItems(
    goals: string[],
): Promise<GeneratedPlanItem[]> {
    try {
        // Format the goals for the prompt
        const formattedGoals = goals.map((goal, index) => `${index + 1}. ${goal}`).join('\n');

        // Create the prompt for OpenAI
        const prompt = `
    Based on the following daily goals:
    ${formattedGoals}

    Generate a practical daily plan with 3-5 specific tasks. For each task, provide:
    1. A clear, actionable title
    2. A brief description of the task
    3. Priority level (low, medium, or high)
    4. Suggested start time (in HH:MM format, 24-hour time)
    5. Suggested end time (in HH:MM format, 24-hour time)

    The plan should help achieve these goals effectively while being realistic about time management.
    Format your response as a JSON array of objects with the properties: title, description, priority, start_time, end_time.
    `;

        // Call OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI assistant that creates practical, actionable daily plans based on goals. Always format your response as a JSON object with a single "daily_plan" key containing an array of task objects. Example: {"daily_plan": [{"title": "Task Title", "description": "Task description", "priority": "medium", "start_time": "09:00", "end_time": "10:00"}]}'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            response_format: {type: 'json_object'},
        });

        // Extract and parse the response
        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No content received from OpenAI');
        }

        console.log('Content received: ', content);

        const parsedContent = JSON.parse(content);

        if (!parsedContent.daily_plan || !Array.isArray(parsedContent.daily_plan)) {
            throw new Error('Invalid response format from OpenAI');
        }

        // Map the response to the expected format
        return parsedContent.daily_plan.map((task: any) => ({
            title: task.title,
            description: task.description,
            priority: task.priority,
            start_time: task.start_time,
            end_time: task.end_time
        }));
    } catch (error) {
        console.error('Error generating AI plan items:', error);
        throw error;
    }
}

/**
 * Converts generated plan items to the database format
 * @param planItems Generated plan items
 * @param planId The ID of the AI plan
 * @returns Array of plan items ready for database insertion
 */
export function formatPlanItemsForDB(
    planItems: GeneratedPlanItem[],
    planId: string
): PlanItemInsert[] {
    return planItems.map(item => ({
        plan_id: planId,
        title: item.title,
        description: item.description,
        priority: item.priority,
        start_time: item.start_time,
        end_time: item.end_time,
        status: PlanItemStatus.SCHEDULED
    }));
} 