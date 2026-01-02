"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, MessageCircle, Users, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const platformStats = [
  { label: "Total Messages", value: "2.4M", change: "+18%", icon: MessageCircle },
  { label: "Active Users", value: "12,847", change: "+12%", icon: Users },
  { label: "Avg Response Time", value: "2.3min", change: "-8%", icon: Clock },
  { label: "Satisfaction Score", value: "4.8/5", change: "+0.2", icon: TrendingUp },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">System-wide performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {platformStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Message Volume</CardTitle>
                <CardDescription>Total messages sent per day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end justify-between gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const height = 40 + Math.random() * 60
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end justify-between gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    const height = 30 + Math.random() * 70
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-green-500 transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
