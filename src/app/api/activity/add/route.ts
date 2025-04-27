import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/src/lib/supabase/server"
import { activitiesService } from "@/src/lib/supabase/db"
import { ActivityStatus } from "@/src/lib/supabase/types"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // Get request body
        const { dayId, type, description, details } = await request.json()

        if (!dayId) {
            return NextResponse.json({ error: "Day ID is required" }, { status: 400 })
        }

        if (!type) {
            return NextResponse.json({ error: "Activity type is required" }, { status: 400 })
        }

        if (!description) {
            return NextResponse.json({ error: "Activity description is required" }, { status: 400 })
        }

        // Verify day belongs to user
        const { data: dayData, error: verifyError } = await supabase
            .from('days')
            .select('*')
            .eq('id', dayId)
            .eq('user_id', user.id)
            .single()

        if (verifyError || !dayData) {
            return NextResponse.json({ error: "Day not found or access denied" }, { status: 403 })
        }

        // Create the activity
        const { data: activity, error: activityError } = await activitiesService.createActivity(
            supabase,
            {
                day_id: dayId,
                user_id: user.id,
                type: type,
                description: description,
                related_goal_id: null, // Could add support for linking to goals later
                status: ActivityStatus.COMPLETED
            }
        )

        if (activityError) {
            return NextResponse.json({ error: activityError.message }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            activity
        })

    } catch (error) {
        console.error("Error adding activity:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
} 