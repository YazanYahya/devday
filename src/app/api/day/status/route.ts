import { NextResponse } from "next/server"
import { createClient } from "@/src/lib/supabase/server"
import { daysService } from "@/src/lib/supabase/db"

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Use the isDayStarted method which already handles today's date internally
    const { isStarted, dayId, error } = await daysService.isDayStarted(
      supabase,
      user.id
    )
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({
      isStarted,
      dayId
    })
    
  } catch (error) {
    console.error("Error getting day status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 