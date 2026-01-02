"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Webhook, Plus, Search, CheckCircle2, XCircle, Clock } from "lucide-react"

const webhooks = [
  {
    id: 1,
    name: "Slack Notifications",
    url: "https://hooks.slack.com/services/...",
    events: ["message.created", "conversation.closed"],
    status: "active",
    lastTriggered: "2 min ago",
    successRate: 99.8,
  },
  {
    id: 2,
    name: "CRM Integration",
    url: "https://api.crm.com/webhooks/...",
    events: ["customer.created", "ticket.updated"],
    status: "active",
    lastTriggered: "15 min ago",
    successRate: 98.2,
  },
  {
    id: 3,
    name: "Analytics Pipeline",
    url: "https://analytics.example.com/ingest",
    events: ["conversation.created", "message.sent"],
    status: "failing",
    lastTriggered: "1 hour ago",
    successRate: 45.3,
  },
]

const recentDeliveries = [
  {
    id: "wh-2024-1847",
    webhook: "Slack Notifications",
    event: "message.created",
    status: "success",
    statusCode: 200,
    time: "2 min ago",
    duration: "142ms",
  },
  {
    id: "wh-2024-1846",
    webhook: "CRM Integration",
    event: "customer.created",
    status: "success",
    statusCode: 200,
    time: "15 min ago",
    duration: "234ms",
  },
  {
    id: "wh-2024-1845",
    webhook: "Analytics Pipeline",
    event: "conversation.created",
    status: "failed",
    statusCode: 500,
    time: "1 hour ago",
    duration: "5021ms",
  },
]

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webhook Management</h1>
          <p className="text-muted-foreground">Manage outgoing webhooks and event subscriptions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Webhook
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Webhooks</CardTitle>
            <Webhook className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{webhooks.length}</div>
            <p className="text-xs text-muted-foreground">2 active, 1 failing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,492</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.8%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-23ms</span> from last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Webhooks</CardTitle>
              <CardDescription>Configured webhook endpoints</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search webhooks..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Last Triggered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground max-w-xs truncate">
                    {webhook.url}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                      {webhook.events.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{webhook.events.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={webhook.status === "active" ? "default" : "destructive"}>{webhook.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={webhook.successRate > 95 ? "text-green-600" : "text-red-600"}>
                      {webhook.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{webhook.lastTriggered}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deliveries</CardTitle>
          <CardDescription>Latest webhook delivery attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Webhook</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Status Code</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-mono text-xs">{delivery.id}</TableCell>
                  <TableCell>{delivery.webhook}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{delivery.event}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {delivery.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm capitalize">{delivery.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-1 text-xs">{delivery.statusCode}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{delivery.duration}</TableCell>
                  <TableCell className="text-muted-foreground">{delivery.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
