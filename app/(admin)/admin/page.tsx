"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Users,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Server,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    name: "Total Workspaces",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Building2,
  },
  {
    name: "Active Users",
    value: "24,891",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Messages Today",
    value: "1.2M",
    change: "+18.7%",
    trend: "up",
    icon: MessageSquare,
  },
  {
    name: "Monthly Revenue",
    value: "$284K",
    change: "+22.3%",
    trend: "up",
    icon: DollarSign,
  },
]

const systemHealth = [
  { name: "API Servers", status: "operational", uptime: "99.98%", icon: Server },
  { name: "WebSocket Cluster", status: "operational", uptime: "99.95%", icon: Activity },
  { name: "PostgreSQL", status: "operational", uptime: "99.99%", icon: Database },
  { name: "MongoDB", status: "operational", uptime: "99.97%", icon: Database },
  { name: "Redis Cluster", status: "degraded", uptime: "98.82%", icon: Database },
  { name: "CDN", status: "operational", uptime: "99.99%", icon: Globe },
]

const recentAlerts = [
  {
    type: "warning",
    message: "Redis cluster failover completed",
    time: "2 minutes ago",
  },
  {
    type: "info",
    message: "Database backup completed successfully",
    time: "1 hour ago",
  },
  {
    type: "error",
    message: "High CPU usage on API server us-east-1a",
    time: "3 hours ago",
  },
]

const resourceUsage = [
  { name: "CPU Usage", value: 68, max: 100, unit: "%" },
  { name: "Memory", value: 142, max: 256, unit: "GB" },
  { name: "Disk Storage", value: 3.2, max: 10, unit: "TB" },
  { name: "Network", value: 2.8, max: 10, unit: "Gbps" },
]

export default function AdminDashboard() {
   
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground">Monitor and control your entire live chat platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success">
                <TrendingUp className="mr-1 inline h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">Uptime: {service.uptime}</div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      service.status === "operational"
                        ? "default"
                        : service.status === "degraded"
                          ? "secondary"
                          : "destructive"
                    }
                    className={service.status === "operational" ? "bg-success text-success-foreground" : ""}
                  >
                    {service.status === "operational" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                    {service.status === "degraded" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full bg-transparent" variant="outline">
              View Detailed Status
            </Button>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resourceUsage.map((resource) => (
                <div key={resource.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">{resource.name}</span>
                    <span className="text-muted-foreground">
                      {resource.value} / {resource.max} {resource.unit}
                    </span>
                  </div>
                  <Progress value={(resource.value / resource.max) * 100} />
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full bg-transparent" variant="outline">
              Scale Resources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-border p-3">
                {alert.type === "error" && <AlertTriangle className="h-5 w-5 text-destructive" />}
                {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-warning" />}
                {alert.type === "info" && <CheckCircle2 className="h-5 w-5 text-info" />}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full bg-transparent" variant="outline">
            View All Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
