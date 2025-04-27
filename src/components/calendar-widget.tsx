"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns"
import { cn } from "@/src/utils/utils"

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Get day names
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

  // Get all days in the month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)

  // Get the start of the first week (Monday before the first day of month if needed)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })

  // Get the end of the last week (Sunday after the last day of month if needed)
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  // Get all days to display
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  // Group days into weeks
  const weeks: Date[][] = []
  let week: Date[] = []

  calendarDays.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })

  return (
    <div className="w-auto rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <button
          onClick={prevMonth}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xs font-medium text-foreground">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={nextMonth}
          className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="p-2">
        <div className="mb-1 grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[10px] font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day) => {
                const isToday = isSameDay(day, new Date())
                const isSelected = isSameDay(day, selectedDate)
                const isCurrentMonth = isSameMonth(day, currentMonth)

                return (
                  <button
                    key={day.toString()}
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-md text-[11px] transition-colors",
                      isCurrentMonth ? "text-foreground" : "text-muted-foreground/50",
                      isToday && !isSelected && "font-medium text-primary",
                      isSelected && "bg-primary/10 font-medium text-primary",
                      !isSelected && "hover:bg-accent",
                    )}
                    onClick={() => setSelectedDate(day)}
                  >
                    {format(day, "d")}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
