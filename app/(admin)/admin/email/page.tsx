"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Mail, Send, Settings, CheckCircle, XCircle, Clock, RefreshCw, Eye, Trash2, Plus, FileText } from "lucide-react"

const emailProviders = [
  { id: "sendgrid", name: "SendGrid", status: "connected", dailyLimit: 100000, used: 45230 },
  { id: "ses", name: "AWS SES", status: "connected", dailyLimit: 50000, used: 12450 },
  { id: "mailgun", name: "Mailgun", status: "disconnected", dailyLimit: 0, used: 0 },
  { id: "postmark", name: "Postmark", status: "backup", dailyLimit: 25000, used: 0 },
]

const emailTemplates = [
  {
    id: 1,
    name: "Welcome Email",
    type: "transactional",
    status: "active",
    lastUpdated: "2 hours ago",
    openRate: "68%",
  },
  { id: 2, name: "Password Reset", type: "transactional", status: "active", lastUpdated: "1 day ago", openRate: "82%" },
  {
    id: 3,
    name: "Conversation Notification",
    type: "notification",
    status: "active",
    lastUpdated: "3 days ago",
    openRate: "45%",
  },
  { id: 4, name: "Weekly Digest", type: "marketing", status: "active", lastUpdated: "1 week ago", openRate: "32%" },
  {
    id: 5,
    name: "Invoice Receipt",
    type: "transactional",
    status: "active",
    lastUpdated: "2 weeks ago",
    openRate: "71%",
  },
  { id: 6, name: "Trial Ending", type: "marketing", status: "draft", lastUpdated: "3 days ago", openRate: "-" },
]

const emailQueue = [
  { id: 1, to: "user@example.com", template: "Welcome Email", status: "delivered", timestamp: "2 min ago" },
  { id: 2, to: "team@company.com", template: "Weekly Digest", status: "pending", timestamp: "5 min ago" },
  { id: 3, to: "admin@workspace.io", template: "Password Reset", status: "delivered", timestamp: "12 min ago" },
  { id: 4, to: "support@client.com", template: "Conversation Notification", status: "failed", timestamp: "15 min ago" },
  { id: 5, to: "billing@enterprise.com", template: "Invoice Receipt", status: "delivered", timestamp: "22 min ago" },
]

const emailStats = [
  { label: "Sent Today", value: "12,450", change: "+8.2%", icon: Send },
  { label: "Delivered", value: "12,234", change: "98.2%", icon: CheckCircle },
  { label: "Bounced", value: "89", change: "0.7%", icon: XCircle },
  { label: "Queue Size", value: "234", change: "-12%", icon: Clock },
]

export default function EmailSystemPage() {
  const [selectedProvider, setSelectedProvider] = useState("sendgrid")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email System</h1>
          <p className="text-muted-foreground">Manage email providers, templates, and delivery settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Status
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {emailStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {emailProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{provider.name}</CardTitle>
                      <CardDescription>Email Provider</CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant={
                      provider.status === "connected"
                        ? "default"
                        : provider.status === "backup"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {provider.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  {provider.status !== "disconnected" && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Daily Usage</span>
                        <span>
                          {provider.used.toLocaleString()} / {provider.dailyLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${(provider.used / provider.dailyLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Configure
                    </Button>
                    {provider.status === "disconnected" ? (
                      <Button size="sm" className="flex-1">
                        Connect
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Test
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Manage transactional and marketing email templates</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="transactional">Transactional</SelectItem>
                      <SelectItem value="notification">Notification</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {template.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={template.status === "active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.openRate}</TableCell>
                      <TableCell className="text-muted-foreground">{template.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Email Queue</CardTitle>
                  <CardDescription>Monitor outgoing emails and delivery status</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm">
                    Retry Failed
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailQueue.map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium">{email.to}</TableCell>
                      <TableCell>{email.template}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            email.status === "delivered"
                              ? "default"
                              : email.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          <span className="flex items-center gap-1">
                            {email.status === "delivered" && <CheckCircle className="h-3 w-3" />}
                            {email.status === "pending" && <Clock className="h-3 w-3" />}
                            {email.status === "failed" && <XCircle className="h-3 w-3" />}
                            {email.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{email.timestamp}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {email.status === "failed" && (
                            <Button variant="ghost" size="icon">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Default Settings</CardTitle>
                <CardDescription>Configure default email behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default From Address</Label>
                  <Input defaultValue="noreply@platform.com" />
                </div>
                <div className="space-y-2">
                  <Label>Default From Name</Label>
                  <Input defaultValue="Platform Support" />
                </div>
                <div className="space-y-2">
                  <Label>Reply-To Address</Label>
                  <Input defaultValue="support@platform.com" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Track Opens</Label>
                    <p className="text-sm text-muted-foreground">Track when emails are opened</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Track Clicks</Label>
                    <p className="text-sm text-muted-foreground">Track link clicks in emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rate Limiting</CardTitle>
                <CardDescription>Control email sending rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Max Emails Per Hour</Label>
                  <Input type="number" defaultValue="5000" />
                </div>
                <div className="space-y-2">
                  <Label>Max Emails Per Day</Label>
                  <Input type="number" defaultValue="100000" />
                </div>
                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input type="number" defaultValue="3" />
                </div>
                <div className="space-y-2">
                  <Label>Retry Delay (minutes)</Label>
                  <Input type="number" defaultValue="15" />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
