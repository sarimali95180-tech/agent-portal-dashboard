"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, MoreVertical, Eye, Copy, Trash2, Key, Activity, TrendingUp, Clock } from "lucide-react"
import { useState } from "react"

const apiKeys = [
  {
    id: "key_1",
    name: "Production API",
    key: "sk_live_4f2e...9a8c",
    workspace: "Acme Corporation",
    requests: 2847291,
    lastUsed: "2 minutes ago",
    created: "2024-01-15",
    status: "active",
  },
  {
    id: "key_2",
    name: "Staging API",
    key: "sk_test_7b3d...4e2f",
    workspace: "Acme Corporation",
    requests: 128456,
    lastUsed: "1 hour ago",
    created: "2024-02-10",
    status: "active",
  },
  {
    id: "key_3",
    name: "Development",
    key: "sk_test_9c1a...6f8b",
    workspace: "TechStart Inc",
    requests: 45123,
    lastUsed: "3 days ago",
    created: "2024-03-05",
    status: "inactive",
  },
]

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/conversations",
    requests: 892471,
    avgLatency: 124,
    errorRate: 0.08,
  },
  {
    method: "GET",
    path: "/api/v1/conversations/:id",
    requests: 1284567,
    avgLatency: 89,
    errorRate: 0.05,
  },
  {
    method: "POST",
    path: "/api/v1/messages",
    requests: 2847291,
    avgLatency: 156,
    errorRate: 0.12,
  },
  {
    method: "GET",
    path: "/api/v1/agents",
    requests: 456789,
    avgLatency: 67,
    errorRate: 0.03,
  },
]

export default function APIManagementPage() {
  const [showKey, setShowKey] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
          <p className="text-muted-foreground">Manage API keys, endpoints, and usage analytics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>Generate a new API key for workspace access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key-name">Key Name</Label>
                <Input id="key-name" placeholder="Production API Key" />
              </div>
              <div>
                <Label htmlFor="workspace">Workspace</Label>
                <Input id="workspace" placeholder="Select workspace..." />
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-2 text-sm">
                  <Key className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Security Notice</p>
                    <p className="text-muted-foreground">
                      API keys provide full access to the workspace. Keep them secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Generate Key</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Across all workspaces</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2M</div>
            <p className="text-xs text-success">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              +12.4% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124ms</div>
            <p className="text-xs text-success">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              -5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Error Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.08%</div>
            <p className="text-xs text-success">
              <TrendingUp className="mr-1 inline h-3 w-3" />
              -12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for workspace access</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-2 py-1 text-xs">
                        {showKey === key.id ? key.key : "••••••••••••••••"}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{key.workspace}</TableCell>
                  <TableCell>{key.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{key.lastUsed}</TableCell>
                  <TableCell>
                    <Badge
                      variant={key.status === "active" ? "default" : "secondary"}
                      className={key.status === "active" ? "bg-success text-success-foreground" : ""}
                    >
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Revoke
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Endpoints Table */}
      <Card>
        <CardHeader>
          <CardTitle>API Endpoints</CardTitle>
          <CardDescription>Performance metrics for all endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Requests (24h)</TableHead>
                <TableHead>Avg Latency</TableHead>
                <TableHead>Error Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        endpoint.method === "GET" ? "border-success text-success" : "border-primary text-primary"
                      }
                    >
                      {endpoint.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm">{endpoint.path}</code>
                  </TableCell>
                  <TableCell>{endpoint.requests.toLocaleString()}</TableCell>
                  <TableCell>{endpoint.avgLatency}ms</TableCell>
                  <TableCell>
                    <span className={endpoint.errorRate < 0.1 ? "text-success" : "text-warning"}>
                      {endpoint.errorRate}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
