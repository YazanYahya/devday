import {NextRequest, NextResponse} from "next/server"
import {createClient} from "@/src/lib/supabase/server"
import {daysService} from "@/src/lib/supabase/db"
import {DayStatus} from "@/src/lib/supabase/types"

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const {data: {user}} = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        // Get request body
        const {dayId, completedGoals, totalGoals} = await request.json()

        if (!dayId) {
            return NextResponse.json({error: "Day entry ID is required"}, {status: 400})
        }

        // Verify day belongs to user
        const {data: dayData, error: verifyError} = await supabase
            .from('days')
            .select('*')
            .eq('id', dayId)
            .eq('user_id', user.id)
            .single()

        if (verifyError || !dayData) {
            return NextResponse.json({error: "Day entry not found or access denied"}, {status: 403})
        }

        // Update day to completed
        const {data: updatedDay, error: updateError} = await daysService.updateDay(
            supabase,
            {
                id: dayId,
                status: DayStatus.COMPLETED,
                end_time: new Date().toISOString(),
                notes: `Completed ${completedGoals} out of ${totalGoals} goals${completedGoals === totalGoals ? ' - All goals completed successfully!' : ''}`
            }
        )

        if (updateError) {
            return NextResponse.json({error: updateError.message}, {status: 500})
        }

        return NextResponse.json({
            success: true,
            day: updatedDay
        })

    } catch (error) {
        console.error("Error ending day:", error)
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
} 