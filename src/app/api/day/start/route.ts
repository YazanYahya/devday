import {NextRequest, NextResponse} from "next/server"
import {createClient} from "@/src/lib/supabase/server"
import {aiPlanService, daysService, goalsService} from "@/src/lib/supabase/db"
import {DayStatus, GoalStatus, GoalType} from "@/src/lib/supabase/types"
import {formatPlanItemsForDB, generateAIPlanItems} from "@/src/lib/openai/planGenerator"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        // Get request body
        const {goals} = await request.json()

        if (!goals || !Array.isArray(goals) || goals.length === 0) {
            return NextResponse.json({error: "Goals are required"}, {status: 400})
        }

        // Check if day is already started using the optimized method
        const {isStarted, error: checkError} = await daysService.isDayStarted(
            supabase,
            user.id
        )

        if (checkError) {
            return NextResponse.json({error: checkError.message}, {status: 500})
        }

        if (isStarted) {
            return NextResponse.json({error: "Day already started"}, {status: 400})
        }

        const today = new Date().toISOString().split('T')[0]

        // Create a new day
        const {data: day, error: dayError} = await daysService.startDay(
            supabase,
            {
                user_id: user.id,
                date: today,
                status: DayStatus.STARTED,
                start_time: new Date().toISOString()
            }
        )

        if (dayError) {
            return NextResponse.json({error: dayError.message}, {status: 500})
        }

        if (!day) {
            return NextResponse.json({error: "Failed to create day"}, {status: 500})
        }

        // Create goals in the database
        const createdGoals = []

        for (const goal of goals) {
            const {data: createdGoal, error: goalError} = await goalsService.createGoal(
                supabase,
                {
                    user_id: user.id,
                    description: goal,
                    type: GoalType.DAILY,
                    status: GoalStatus.ACTIVE,
                    start_date: today
                }
            )

            if (goalError) {
                console.error("Error creating goal:", goalError)
                continue
            }

            if (createdGoal) {
                createdGoals.push(createdGoal)
            }
        }

        // Generate AI plan items based on the goals
        try {
            // Create an AI plan
            const {data: aiPlan, error: aiPlanError} = await aiPlanService.createAIPlan(
                supabase,
                {
                    day_id: day.id,
                    user_id: user.id
                }
            )

            if (aiPlanError) {
                console.error("Error creating AI plan:", aiPlanError)
                return NextResponse.json({
                    success: true,
                    day: {
                        id: day.id
                    }
                })
            }

            // Generate plan items with OpenAI
            const generatedPlanItems = await generateAIPlanItems(goals)

            if (generatedPlanItems.length > 0 && aiPlan) {
                // Format and save plan items
                const planItemsForDB = formatPlanItemsForDB(generatedPlanItems, aiPlan.id)

                const {error: planItemsError} = await aiPlanService.createPlanItems(
                    supabase,
                    planItemsForDB
                )

                if (planItemsError) {
                    console.error("Error creating plan items:", planItemsError)
                }
            }
        } catch (aiError) {
            console.error("Error generating AI plan:", aiError)
            // Continue with the response even if AI plan generation fails
        }

        return NextResponse.json({
            success: true,
            day: {
                id: day.id
            }
        })

    } catch (error) {
        console.error("Error starting day:", error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
} 