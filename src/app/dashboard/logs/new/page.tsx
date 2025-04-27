import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { DatePicker } from "@/src/components/date-picker"
import { Input } from "@/src/components/ui/input"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/logs">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Create New Log</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Details</CardTitle>
          <CardDescription>Record your activity, learning, or reflection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Log Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
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
              <Label>Date</Label>
              <DatePicker />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Brief title for your log" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe what you did, learned, or reflected on" rows={6} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedGoal">Related Goal (Optional)</Label>
            <Select>
              <SelectTrigger id="relatedGoal">
                <SelectValue placeholder="Select a related goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="goal1">Learn React Native</SelectItem>
                <SelectItem value="goal2">Improve Communication Skills</SelectItem>
                <SelectItem value="goal3">Master TypeScript</SelectItem>
                <SelectItem value="goal4">Lead a Project Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard/logs">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button>Create Log</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
