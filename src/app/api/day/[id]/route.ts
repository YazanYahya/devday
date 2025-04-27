import {NextRequest, NextResponse} from "next/server"
import {createClient} from "@/src/lib/supabase/server"
import {activitiesService, aiPlanService, daysService, goalsService} from "@/src/lib/supabase/db"

export async function GET(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const { id: dayId } = await params

        if (!dayId) {
            return NextResponse.json({error: "Day ID is required"}, {status: 400})
        }

        const supabase = await createClient()

        // Check if user is authenticated
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        // Get day data
        const {data: day, error: dayError} = await daysService.getDayById(
            supabase,
            dayId,
            user.id
        )

        if (dayError) {
            return NextResponse.json({error: dayError.message}, {status: 500})
        }

        if (!day) {
            return NextResponse.json({error: "Day not found"}, {status: 404})
        }

        // Get goals for this day
        const {data: goals, error: goalsError} = await goalsService.getGoalsByDate(
            supabase,
            user.id,
            day.date
        )

        if (goalsError) {
            console.error("Error fetching goals:", goalsError)
            return NextResponse.json({error: goalsError.message}, {status: 500})
        }

        // Get AI plan for this day
        const {data: aiPlan, error: aiPlanError} = await aiPlanService.getAIPlanByDayId(
            supabase,
            dayId
        )

        if (aiPlanError) {
            console.error("Error fetching AI plan:", aiPlanError)
            return NextResponse.json({error: aiPlanError.message}, {status: 500})
        }

        let planItems = []
        if (aiPlan) {
            const {data: items, error: itemsError} = await aiPlanService.getPlanItemsByPlanId(
                supabase,
                aiPlan.id
            )

            if (itemsError) {
                console.error("Error fetching plan items:", itemsError)
                return NextResponse.json({error: itemsError.message}, {status: 500})
            }

            planItems = items || []
        }

        // Get activities for this day
        const {data: activities, error: activitiesError} = await activitiesService.getActivitiesByDayId(
            supabase,
            dayId
        )

        if (activitiesError) {
            console.error("Error fetching activities:", activitiesError)
            return NextResponse.json({error: activitiesError.message}, {status: 500})
        }

        // Format the response
        return NextResponse.json({
            success: true,
            day: {
                id: day.id,
                date: day.date,
                status: day.status,
                start_time: day.start_time,
                end_time: day.end_time,
                notes: day.notes
            },
            goals: goals && goals.length > 0 ? goals.map(goal => ({
                id: goal.id,
                description: goal.description,
                status: goal.status
            })) : [],
            aiPlan: aiPlan ? {
                id: aiPlan.id,
                planItems: planItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    priority: item.priority,
                    start_time: item.start_time,
                    end_time: item.end_time,
                    status: item.status
                }))
            } : undefined,
            activities: activities && activities.length > 0 ? activities.map(activity => ({
                id: activity.id,
                type: activity.type,
                description: activity.description,
                status: activity.status,
                related_goal_id: activity.related_goal_id
            })) : []
        })

    } catch (error) {
        console.error("Error getting day data:", error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}