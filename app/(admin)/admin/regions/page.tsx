"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Server, Activity, Zap, CheckCircle, AlertTriangle, Plus, Settings, TrendingUp } from "lucide-react"

const regions = [
  {
    id: "us-east-1",
    name: "US East (N. Virginia)",
    location: "Virginia, USA",
    status: "healthy",
    latency: "12ms",
    workspaces: 2456,
    traffic: 45,
    servers: 12,
    cpu: 42,
    memory: 58,
    primary: true,
  },
  {
    id: "us-west-2",
    name: "US West (Oregon)",
    location: "Oregon, USA",
    status: "healthy",
    latency: "18ms",
    workspaces: 1823,
    traffic: 28,
    servers: 8,
    cpu: 38,
    memory: 52,
    primary: false,
  },
  {
    id: "eu-west-1",
    name: "EU West (Ireland)",
    location: "Dublin, Ireland",
    status: "healthy",
    latency: "45ms",
    workspaces: 1567,
    traffic: 18,
    servers: 6,
    cpu: 35,
    memory: 48,
    primary: false,
  },
  {
    id: "ap-southeast-1",
    name: "Asia Pacific (Singapore)",
    location: "Singapore",
    status: "warning",
    latency: "85ms",
    workspaces: 892,
    traffic: 9,
    servers: 4,
    cpu: 72,
    memory: 78,
    primary: false,
  },
]

const cdnPops = [
  { location: "New York", status: "active", requests: "12.5M/day", hitRate: "94.2%" },
  { location: "San Francisco", status: "active", requests: "8.3M/day", hitRate: "92.8%" },
  { location: "London", status: "active", requests: "6.7M/day", hitRate: "93.5%" },
  { location: "Frankfurt", status: "active", requests: "5.2M/day", hitRate: "91.9%" },
  { location: "Tokyo", status: "active", requests: "4.8M/day", hitRate: "90.4%" },
  { location: "Sydney", status: "active", requests: "2.1M/day", hitRate: "89.7%" },
  { location: "Sao Paulo", status: "degraded", requests: "1.8M/day", hitRate: "85.2%" },
]

const trafficRouting = [
  { rule: "US Users", destination: "us-east-1", fallback: "us-west-2", priority: 1 },
  { rule: "EU Users", destination: "eu-west-1", fallback: "us-east-1", priority: 2 },
  { rule: "APAC Users", destination: "ap-southeast-1", fallback: "us-west-2", priority: 3 },
  { rule: "Default", destination: "us-east-1", fallback: "eu-west-1", priority: 99 },
]

export default function RegionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Regions</h1>
          <p className="text-muted-foreground">Manage geographic regions and traffic routing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Routing Rules
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Region
          </Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Regions</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Globe className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Servers</p>
                <p className="text-2xl font-bold">30</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <Server className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Global Latency</p>
                <p className="text-2xl font-bold">38ms</p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <Zap className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CDN Hit Rate</p>
                <p className="text-2xl font-bold">92.4%</p>
              </div>
              <div className="rounded-full bg-orange-500/10 p-3">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regions Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {region.name}
                    {region.primary && <Badge variant="secondary">Primary</Badge>}
                  </CardTitle>
                  <CardDescription>{region.location}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {region.status === "healthy" ? (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Healthy
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-yellow-500 text-yellow-950">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    Warning
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Latency</p>
                  <p className="font-semibold">{region.latency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Workspaces</p>
                  <p className="font-semibold">{region.workspaces.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Traffic</p>
                  <p className="font-semibold">{region.traffic}%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU Usage</span>
                    <span>{region.cpu}%</span>
                  </div>
                  <Progress value={region.cpu} className="h-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Memory Usage</span>
                    <span>{region.memory}%</span>
                  </div>
                  <Progress value={region.memory} className="h-1.5" />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Activity className="mr-2 h-4 w-4" />
                  Monitor
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CDN Points of Presence */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>CDN Points of Presence</CardTitle>
              <CardDescription>Edge locations for content delivery</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Hit Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cdnPops.map((pop, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{pop.location}</TableCell>
                  <TableCell>
                    <Badge variant={pop.status === "active" ? "default" : "secondary"}>{pop.status}</Badge>
                  </TableCell>
                  <TableCell>{pop.requests}</TableCell>
                  <TableCell>{pop.hitRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Traffic Routing Rules */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Traffic Routing Rules</CardTitle>
              <CardDescription>Geographic routing configuration</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Primary Destination</TableHead>
                <TableHead>Fallback</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trafficRouting.map((rule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{rule.rule}</TableCell>
                  <TableCell>
                    <code className="text-sm">{rule.destination}</code>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm">{rule.fallback}</code>
                  </TableCell>
                  <TableCell>{rule.priority}</TableCell>
                  <TableCell>
                    <Switch defaultChecked />
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
