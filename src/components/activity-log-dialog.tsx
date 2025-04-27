"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useToast } from "@/src/hooks/use-toast"
import { useAppStore } from "@/src/stores/app-store"

interface ActivityLogDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}

export default function ActivityLogDialog({ 
  isOpen, 
  onOpenChange,
  title = "Add Activity Log" 
}: ActivityLogDialogProps) {
  const [activityType, setActivityType] = useState("task")
  const [activityTitle, setActivityTitle] = useState("")
  const [activityDescription, setActivityDescription] = useState("")
  
  const { toast } = useToast()
  const { addActivity } = useAppStore()
  
  const handleAddActivity = () => {
    if (!activityTitle.trim()) {
      toast({
        title: "Missing details",
        description: "Please enter an activity title",
        variant: "destructive"
      })
      return
    }
    
    // Call store function to add activity
    addActivity({
      type: activityType,
      description: activityTitle,
      details: activityDescription,
    })
    
    // Reset and close dialog
    resetForm()
    onOpenChange(false)
    
    toast({
      title: "Activity logged",
      description: "Your activity has been added to the timeline"
    })
  }
  
  const resetForm = () => {
    setActivityType("task")
    setActivityTitle("")
    setActivityDescription("")
  }
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="activity-type">Activity Type</Label>
            <Select value={activityType} onValueChange={setActivityType}>
              <SelectTrigger id="activity-type">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="reflection">Reflection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity-title">What are you working on?</Label>
            <Input 
              id="activity-title" 
              value={activityTitle}
              onChange={(e) => setActivityTitle(e.target.value)}
              placeholder="Brief title for your activity"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity-description">Description (Optional)</Label>
            <Textarea 
              id="activity-description"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              placeholder="Describe what you did in more detail"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddActivity}>Log Activity</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 