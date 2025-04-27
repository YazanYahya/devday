"use client"

import { DialogFooter } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Progress } from "@/src/components/ui/progress"
import { CheckCircle, Target, Moon } from "lucide-react"
import { motion } from "framer-motion"

interface CloseDayDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  completedGoals: number
  totalGoals: number
}

export default function CloseDayDialog({ open, onClose, onConfirm, completedGoals, totalGoals }: CloseDayDialogProps) {
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Close Your Day</DialogTitle>
          <DialogDescription>Summarize your day and prepare for tomorrow</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <motion.div
            className="rounded-lg border p-6 bg-card/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-medium text-lg">Goal Completion</span>
              </div>
              <span className="text-lg font-bold">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2 mb-4" />
            <p className="text-sm text-muted-foreground">
              You completed {completedGoals} out of {totalGoals} goals today
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg border p-6 bg-card/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span className="font-medium text-lg">Today's Achievements</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Fixed bug in checkout flow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Received feedback on code review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm">Attended team meeting</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="gap-2">
            <Moon className="h-4 w-4" /> Close Day
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
