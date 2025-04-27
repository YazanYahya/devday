"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Switch } from "@/src/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Separator } from "@/src/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Github, Slack, Calendar, Moon, Sun, Laptop } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState("system")

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="Yazan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Alabdullatif" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="yazan@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" defaultValue="Senior Software Developer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Tech Innovations Inc." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactor">Two-factor authentication</Label>
                  <Switch id="twoFactor" />
                </div>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dataExport">Data Export</Label>
                  <Button variant="outline" size="sm">
                    Export Data
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Download all your data in a JSON format</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <NotificationSetting
                  title="Daily Reminders"
                  description="Receive reminders to log your daily activities"
                  defaultChecked={true}
                />

                <NotificationSetting
                  title="Goal Deadlines"
                  description="Get notified when goals are approaching their deadline"
                  defaultChecked={true}
                />

                <NotificationSetting
                  title="Weekly Summaries"
                  description="Receive weekly progress summaries and insights"
                  defaultChecked={true}
                />

                <NotificationSetting
                  title="AI Recommendations"
                  description="Get personalized recommendations from the AI planner"
                  defaultChecked={true}
                />

                <NotificationSetting
                  title="Achievement Milestones"
                  description="Celebrate when you reach important milestones"
                  defaultChecked={true}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notificationTime">Preferred Notification Time</Label>
                <Select defaultValue="morning">
                  <SelectTrigger id="notificationTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8:00 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationChannel">Notification Channels</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch id="emailNotifications" defaultChecked />
                    <Label htmlFor="emailNotifications">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="pushNotifications" defaultChecked />
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect with other tools and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <IntegrationSetting
                  icon={<Github className="h-5 w-5" />}
                  title="GitHub"
                  description="Track your code activity and contributions"
                  connected={true}
                />

                <IntegrationSetting
                  icon={<Slack className="h-5 w-5" />}
                  title="Slack"
                  description="Import communication logs and team interactions"
                  connected={false}
                />

                <IntegrationSetting
                  icon={<Calendar className="h-5 w-5" />}
                  title="Google Calendar"
                  description="Sync your calendar events and meetings"
                  connected={false}
                />
              </div>

              <div className="rounded-md border p-4 bg-muted/30">
                <h3 className="font-medium mb-2">Integration Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Automatically track your development activities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Sync your calendar events for better time tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    Import communication logs to track team interactions
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how dailydev.ai looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="justify-start gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="justify-start gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="justify-start gap-2"
                    onClick={() => setTheme("system")}
                  >
                    <Laptop className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Interface Animations</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Enable or disable interface animations</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compactMode">Compact Mode</Label>
                  <Switch id="compactMode" />
                </div>
                <p className="text-sm text-muted-foreground">Use a more compact layout to fit more content on screen</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NotificationSetting({
  title,
  description,
  defaultChecked,
}: {
  title: string
  description: string
  defaultChecked: boolean
}) {
  return (
    <div className="flex items-start justify-between space-y-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}

function IntegrationSetting({
  icon,
  title,
  description,
  connected,
}: {
  icon: React.ReactNode
  title: string
  description: string
  connected: boolean
}) {
  return (
    <div className="flex items-start justify-between space-y-0">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{title}</p>
            {connected && (
              <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">Connected</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant={connected ? "outline" : "default"} size="sm">
        {connected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  )
}
