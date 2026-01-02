"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  Settings,
  CheckCircle,
  ExternalLink,
  Zap,
  MessageSquare,
  CreditCard,
  Database,
  Cloud,
  BarChart3,
  Users,
  Lock,
  RefreshCw,
} from "lucide-react"

const integrationCategories = [
  { id: "all", name: "All", count: 24 },
  { id: "crm", name: "CRM", count: 6 },
  { id: "messaging", name: "Messaging", count: 5 },
  { id: "payments", name: "Payments", count: 4 },
  { id: "analytics", name: "Analytics", count: 5 },
  { id: "storage", name: "Storage", count: 4 },
]

const integrations = [
  {
    id: 1,
    name: "Salesforce",
    category: "crm",
    description: "Sync contacts and conversations with Salesforce CRM",
    status: "connected",
    icon: Users,
    color: "bg-blue-500",
    workspaces: 145,
    lastSync: "2 min ago",
  },
  {
    id: 2,
    name: "HubSpot",
    category: "crm",
    description: "Two-way sync with HubSpot CRM and Marketing",
    status: "connected",
    icon: Users,
    color: "bg-orange-500",
    workspaces: 89,
    lastSync: "5 min ago",
  },
  {
    id: 3,
    name: "Slack",
    category: "messaging",
    description: "Send notifications and updates to Slack channels",
    status: "connected",
    icon: MessageSquare,
    color: "bg-purple-500",
    workspaces: 312,
    lastSync: "1 min ago",
  },
  {
    id: 4,
    name: "Microsoft Teams",
    category: "messaging",
    description: "Integrate with Microsoft Teams for notifications",
    status: "connected",
    icon: MessageSquare,
    color: "bg-blue-600",
    workspaces: 178,
    lastSync: "3 min ago",
  },
  {
    id: 5,
    name: "Stripe",
    category: "payments",
    description: "Process payments and manage subscriptions",
    status: "connected",
    icon: CreditCard,
    color: "bg-indigo-500",
    workspaces: 456,
    lastSync: "Real-time",
  },
  {
    id: 6,
    name: "Segment",
    category: "analytics",
    description: "Send event data to Segment for analytics",
    status: "connected",
    icon: BarChart3,
    color: "bg-green-500",
    workspaces: 67,
    lastSync: "Real-time",
  },
  {
    id: 7,
    name: "Mixpanel",
    category: "analytics",
    description: "Track user behavior and product analytics",
    status: "available",
    icon: BarChart3,
    color: "bg-violet-500",
    workspaces: 0,
    lastSync: "-",
  },
  {
    id: 8,
    name: "AWS S3",
    category: "storage",
    description: "Store attachments and exports in S3",
    status: "connected",
    icon: Cloud,
    color: "bg-yellow-500",
    workspaces: 234,
    lastSync: "Real-time",
  },
  {
    id: 9,
    name: "Google Cloud Storage",
    category: "storage",
    description: "Cloud storage for files and backups",
    status: "available",
    icon: Cloud,
    color: "bg-red-500",
    workspaces: 0,
    lastSync: "-",
  },
  {
    id: 10,
    name: "Zendesk",
    category: "crm",
    description: "Sync tickets and customer data with Zendesk",
    status: "beta",
    icon: Users,
    color: "bg-teal-500",
    workspaces: 12,
    lastSync: "10 min ago",
  },
]

const oauthApps = [
  {
    id: 1,
    name: "Mobile App",
    clientId: "mob_xxx...xxx",
    status: "active",
    created: "Jan 15, 2025",
    requests: "45.2K/day",
  },
  {
    id: 2,
    name: "Chrome Extension",
    clientId: "chr_xxx...xxx",
    status: "active",
    created: "Feb 2, 2025",
    requests: "12.8K/day",
  },
  {
    id: 3,
    name: "Partner API",
    clientId: "par_xxx...xxx",
    status: "active",
    created: "Mar 10, 2025",
    requests: "8.9K/day",
  },
  {
    id: 4,
    name: "Internal Tools",
    clientId: "int_xxx...xxx",
    status: "active",
    created: "Nov 5, 2024",
    requests: "2.3K/day",
  },
]

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Manage third-party integrations and OAuth applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Integrations</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Workspaces Using</p>
                <p className="text-2xl font-bold">1,493</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Zap className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Requests Today</p>
                <p className="text-2xl font-bold">156K</p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <Database className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">OAuth Apps</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="rounded-full bg-orange-500/10 p-3">
                <Lock className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="marketplace" className="space-y-4">
        <TabsList>
          <TabsTrigger value="marketplace">Integration Marketplace</TabsTrigger>
          <TabsTrigger value="oauth">OAuth Applications</TabsTrigger>
          <TabsTrigger value="webhooks">Global Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {integrationCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.color}`}>
                      <integration.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={
                      integration.status === "connected"
                        ? "default"
                        : integration.status === "beta"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {integration.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                  {integration.status !== "available" && (
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>{integration.workspaces} workspaces</span>
                      <span>Sync: {integration.lastSync}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {integration.status === "available" ? (
                      <Button size="sm" className="flex-1">
                        Enable
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>OAuth Applications</CardTitle>
                  <CardDescription>Manage OAuth clients for API access</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create App
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Client ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oauthApps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell className="font-mono text-sm">{app.clientId}</TableCell>
                      <TableCell>
                        <Badge variant="default">{app.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{app.created}</TableCell>
                      <TableCell>{app.requests}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Rotate Secret
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

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Global Webhooks</CardTitle>
                  <CardDescription>System-wide webhook endpoints for all events</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No global webhooks configured</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add a global webhook to receive events from all workspaces
                </p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add First Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
