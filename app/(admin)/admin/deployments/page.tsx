"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Rocket, GitBranch, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const deployments = [
  {
    id: "dep-2024-047",
    branch: "main",
    commit: "a3f7b91",
    message: "Fix: WebSocket reconnection logic",
    author: "Sarah Johnson",
    status: "success",
    environment: "production",
    duration: "3m 42s",
    time: "2 hours ago",
  },
  {
    id: "dep-2024-046",
    branch: "staging",
    commit: "c8e4d2a",
    message: "Feature: Add AI sentiment analysis",
    author: "Michael Chen",
    status: "success",
    environment: "staging",
    duration: "2m 18s",
    time: "5 hours ago",
  },
  {
    id: "dep-2024-045",
    branch: "main",
    commit: "f2b9c7e",
    message: "Update: Redis connection pooling",
    author: "Emily Rodriguez",
    status: "failed",
    environment: "production",
    duration: "1m 05s",
    time: "8 hours ago",
  },
  {
    id: "dep-2024-044",
    branch: "develop",
    commit: "d5a1f8b",
    message: "Refactor: Database query optimization",
    author: "David Park",
    status: "in_progress",
    environment: "development",
    duration: "running...",
    time: "12 hours ago",
  },
]

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deployments</h1>
          <p className="text-muted-foreground">CI/CD pipeline and deployment history</p>
        </div>
        <Button>
          <Rocket className="mr-2 h-4 w-4" />
          New Deployment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m 45s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-18s</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Today</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+1</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Deployments</CardTitle>
          <CardDescription>Latest deployment activity across all environments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deployment</TableHead>
                <TableHead>Commit</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deployments.map((deployment) => (
                <TableRow key={deployment.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-3 w-3 text-muted-foreground" />
                        <span className="font-mono text-xs">{deployment.branch}</span>
                      </div>
                      <div className="text-sm">{deployment.message}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-1 text-xs">{deployment.commit}</code>
                  </TableCell>
                  <TableCell className="text-sm">{deployment.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        deployment.environment === "production"
                          ? "default"
                          : deployment.environment === "staging"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {deployment.environment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {deployment.status === "success" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      {deployment.status === "failed" && <XCircle className="h-4 w-4 text-red-600" />}
                      {deployment.status === "in_progress" && <AlertCircle className="h-4 w-4 text-yellow-600" />}
                      <span className="text-sm capitalize">{deployment.status.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{deployment.duration}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{deployment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deployment Pipeline</CardTitle>
          <CardDescription>Current build status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Build</span>
              <Badge variant="default">Success</Badge>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Tests</span>
              <Badge variant="default">Passed</Badge>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Deploy</span>
              <Badge variant="secondary">In Progress</Badge>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
