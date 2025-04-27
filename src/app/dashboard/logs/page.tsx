"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Plus, Filter, Calendar, Clock, FileText, CheckCircle } from 'lucide-react'
import Link from "next/link"
import RecentLogs from "@/src/components/recent-logs"
import { DatePicker } from "@/src/components/date-picker"
import LogShortcuts from "@/src/components/log-shortcuts"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

export default function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">Activity Logs</h1>
          <p className="text-sm text-muted-foreground">Record and track all your professional activities</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/logs/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Log
            </Button>
          </Link>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-xs text-muted-foreground">Total Logs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Pending Reflections</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Log</CardTitle>
          <CardDescription>Quickly create a new log by type</CardDescription>
        </CardHeader>
        <CardContent>
          <LogShortcuts />
        </CardContent>
      </Card>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search" className="text-xs">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-xs">
                Log Type
              </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Logs</SelectItem>
                  <SelectItem value="tasks">Tasks</SelectItem>
                  <SelectItem value="meetings">Meetings</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="reflection">Reflection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date" className="text-xs">
                Date Range
              </Label>
              <div className="flex gap-2 items-center">
                <DatePicker />
                <span className="text-xs text-muted-foreground">to</span>
                <DatePicker />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="reflection">Reflection</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Activity Logs</CardTitle>
              <CardDescription>View all your logged activities</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Logs</CardTitle>
              <CardDescription>View your logged tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs type="task" extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Logs</CardTitle>
              <CardDescription>View your logged meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs type="meeting" extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Logs</CardTitle>
              <CardDescription>View your logged learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs type="learning" extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Logs</CardTitle>
              <CardDescription>View your logged feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs type="feedback" extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reflection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reflection Logs</CardTitle>
              <CardDescription>View your personal reflections</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentLogs type="reflection" extended />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
