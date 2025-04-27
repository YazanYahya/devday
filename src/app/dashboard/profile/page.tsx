"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Progress } from "@/src/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Calendar, Target, Award, Flame, Github, Twitter, Globe, Mail, MapPin, Briefcase } from "lucide-react"

export default function ProfilePage() {
  // Mock data - in a real app, this would come from an API
  const user = {
    name: "Yazan Alabdullatif",
    title: "Senior Software Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    email: "yazan@example.com",
    bio: "Passionate software developer focused on building scalable web applications. Currently learning TypeScript and improving my technical communication skills.",
    website: "https://yazandev.com",
    github: "yazandev",
    twitter: "yazandev",
    joinDate: "January 2023",
    streak: 12,
    totalLogs: 387,
    completedGoals: 15,
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 65 },
      { name: "Node.js", level: 75 },
      { name: "Next.js", level: 80 },
    ],
    badges: [
      { name: "30-Day Streak", icon: <Flame className="h-4 w-4" />, date: "March 2023" },
      { name: "Goal Master", icon: <Target className="h-4 w-4" />, date: "February 2023" },
      { name: "Early Adopter", icon: <Award className="h-4 w-4" />, date: "January 2023" },
    ],
    recentActivities: [
      { type: "goal", title: "Completed TypeScript Generics module", date: "2 days ago" },
      { type: "streak", title: "Reached 10-day streak", date: "4 days ago" },
      { type: "log", title: "Added 5 learning logs", date: "1 week ago" },
    ],
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-medium tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">View and manage your developer profile</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback>YA</AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{user.title}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Badge variant="secondary" className="gap-1">
                    <Flame className="h-3 w-3" />
                    {user.streak} day streak
                  </Badge>
                  <Badge variant="secondary">{user.totalLogs} logs</Badge>
                  <Badge variant="secondary">{user.completedGoals} goals</Badge>
                </div>

                <div className="w-full space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{user.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Github className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">GitHub</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Twitter</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only md:inline">Website</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {badge.icon}
                    </div>
                    <div>
                      <div className="font-medium">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">Earned {badge.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{user.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="activity" className="flex-1">
                Recent Activity
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {user.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                        <div className="mt-0.5">
                          {activity.type === "goal" && <Target className="h-4 w-4 text-primary" />}
                          {activity.type === "streak" && <Flame className="h-4 w-4 text-warning" />}
                          {activity.type === "log" && <Calendar className="h-4 w-4 text-info" />}
                        </div>
                        <div>
                          <div className="text-sm">{activity.title}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardContent className="p-4">
                  <div className="grid gap-4 grid-cols-2">
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{user.totalLogs}</div>
                      <div className="text-xs text-muted-foreground">Total Logs</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{user.completedGoals}</div>
                      <div className="text-xs text-muted-foreground">Completed Goals</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">{user.streak}</div>
                      <div className="text-xs text-muted-foreground">Current Streak</div>
                    </div>
                    <div className="rounded-lg border p-3 text-center">
                      <div className="text-2xl font-bold">30</div>
                      <div className="text-xs text-muted-foreground">Longest Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
