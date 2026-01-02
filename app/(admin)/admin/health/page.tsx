"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Server,
  Database,
  Wifi,
  HardDrive,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const systemStatus = [
  { name: "API Servers", status: "operational", uptime: 99.98, icon: Server },
  { name: "WebSocket Cluster", status: "operational", uptime: 99.95, icon: Wifi },
  { name: "PostgreSQL", status: "operational", uptime: 99.99, icon: Database },
  { name: "MongoDB", status: "operational", uptime: 99.97, icon: Database },
  { name: "Redis Cluster", status: "degraded", uptime: 98.82, icon: Database },
  { name: "File Storage", status: "operational", uptime: 99.99, icon: HardDrive },
]

const metrics = [
  { name: "Request Rate", value: "12.4K/s", change: "+8%", trend: "up" },
  { name: "Response Time", value: "124ms", change: "-5%", trend: "down" },
  { name: "Error Rate", value: "0.08%", change: "-12%", trend: "down" },
  { name: "Throughput", value: "2.8 GB/s", change: "+15%", trend: "up" },
]

const performanceData = [
  { time: "00:00", requests: 8200, errors: 12 },
  { time: "04:00", requests: 6800, errors: 8 },
  { time: "08:00", requests: 11200, errors: 15 },
  { time: "12:00", requests: 15400, errors: 22 },
  { time: "16:00", requests: 13800, errors: 18 },
  { time: "20:00", requests: 12100, errors: 14 },
]

const recentIncidents = [
  {
    type: "resolved",
    title: "Redis cluster failover completed",
    description: "Automatic failover to secondary cluster",
    time: "2 minutes ago",
  },
  {
    type: "investigating",
    title: "High CPU usage on API servers",
    description: "Monitoring increased load on us-east-1a",
    time: "15 minutes ago",
  },
  {
    type: "resolved",
    title: "Database backup completed",
    description: "Automated daily backup successful",
    time: "1 hour ago",
  },
]

export default function SystemHealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
          <p className="text-muted-foreground">Real-time monitoring of all platform services</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p
                className={`text-xs ${
                  metric.trend === "up" && metric.name !== "Error Rate" ? "text-success" : "text-success"
                }`}
              >
                <TrendingUp className="mr-1 inline h-3 w-3" />
                {metric.change} from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Request Performance (Last 24 Hours)</CardTitle>
          <CardDescription>Total requests and error rate over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="errors" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Current operational status of all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <service.icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">Uptime: {service.uptime}%</div>
                    </div>
                  </div>
                  <Badge
                    variant={service.status === "operational" ? "default" : "secondary"}
                    className={
                      service.status === "operational"
                        ? "bg-success text-success-foreground"
                        : "bg-warning text-warning-foreground"
                    }
                  >
                    {service.status === "operational" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                    {service.status === "degraded" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Latest system events and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  {incident.type === "resolved" && <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />}
                  {incident.type === "investigating" && <AlertTriangle className="mt-0.5 h-5 w-5 text-warning" />}
                  <div className="flex-1 space-y-1">
                    <div className="font-medium">{incident.title}</div>
                    <div className="text-sm text-muted-foreground">{incident.description}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {incident.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full bg-transparent">
              View All Incidents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
