"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Database, HardDrive, Activity, RefreshCw, Download, Settings } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

const slowQueries = [
  {
    query: "SELECT * FROM conversations WHERE...",
    database: "PostgreSQL Primary",
    duration: "2.4s",
    calls: 147,
    impact: "high",
  },
  {
    query: "UPDATE messages SET status = 'read'...",
    database: "PostgreSQL Primary",
    duration: "1.8s",
    calls: 892,
    impact: "medium",
  },
  {
    query: "db.messages.find({conversation_id:...",
    database: "MongoDB Messages",
    duration: "1.2s",
    calls: 324,
    impact: "medium",
  },
]

export default function DatabasePage() {
  const [databases, setDatabases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDatabases()
  }, [])

  const fetchDatabases = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/databases")
      const data = await response.json()
      setDatabases(data)
    } catch (error) {
      console.error("Failed to fetch databases:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Management</h1>
          <p className="text-muted-foreground">Monitor and manage database infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchDatabases} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Metrics
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Databases</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">All instances healthy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,995</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Normal</span> load
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Query Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12ms</span> from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 TB</div>
            <p className="text-xs text-muted-foreground">of 5 TB total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {databases.map((db) => (
          <Card key={db.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{db.name}</CardTitle>
                  <CardDescription>
                    {db.type} {db.version} • {db.region}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{db.status}</Badge>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-medium">
                      {db.connections} / {db.maxConnections}
                    </span>
                  </div>
                  <Progress value={(db.connections / db.maxConnections) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{db.storage}%</span>
                  </div>
                  <Progress value={db.storage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-medium">{db.cpu}%</span>
                  </div>
                  <Progress value={db.cpu} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slow Queries</CardTitle>
          <CardDescription>Queries requiring optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Database</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Calls</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slowQueries.map((query, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs max-w-md truncate">{query.query}</TableCell>
                  <TableCell>{query.database}</TableCell>
                  <TableCell className="font-semibold">{query.duration}</TableCell>
                  <TableCell>{query.calls}</TableCell>
                  <TableCell>
                    <Badge variant={query.impact === "high" ? "destructive" : "secondary"}>{query.impact}</Badge>
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
