import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Scale,
} from "lucide-react"

const regions = [
  {
    name: "US East (N. Virginia)",
    code: "us-east-1",
    status: "operational",
    servers: 24,
    cpu: 68,
    memory: 72,
    latency: 12,
  },
  {
    name: "US West (Oregon)",
    code: "us-west-2",
    status: "operational",
    servers: 18,
    cpu: 54,
    memory: 61,
    latency: 15,
  },
  {
    name: "EU (Frankfurt)",
    code: "eu-central-1",
    status: "operational",
    servers: 20,
    cpu: 71,
    memory: 68,
    latency: 18,
  },
  {
    name: "Asia Pacific (Tokyo)",
    code: "ap-northeast-1",
    status: "degraded",
    servers: 16,
    cpu: 82,
    memory: 88,
    latency: 24,
  },
]

const databases = [
  {
    name: "PostgreSQL Primary",
    type: "PostgreSQL 15",
    region: "us-east-1",
    size: "3.2 TB",
    connections: 142,
    maxConnections: 500,
    cpu: 45,
    status: "healthy",
  },
  {
    name: "PostgreSQL Read Replica 1",
    type: "PostgreSQL 15",
    region: "us-west-2",
    size: "3.2 TB",
    connections: 89,
    maxConnections: 500,
    cpu: 32,
    status: "healthy",
  },
  {
    name: "MongoDB Cluster",
    type: "MongoDB 7.0",
    region: "multi-region",
    size: "8.7 TB",
    connections: 256,
    maxConnections: 1000,
    cpu: 58,
    status: "healthy",
  },
  {
    name: "Redis Cluster",
    type: "Redis 7.2",
    region: "us-east-1",
    size: "128 GB",
    connections: 1842,
    maxConnections: 10000,
    cpu: 71,
    status: "healthy",
  },
]

const infrastructure = [
  { name: "Total Servers", value: "78", icon: Server },
  { name: "Database Instances", value: "12", icon: Database },
  { name: "Storage Capacity", value: "15.3 TB", icon: HardDrive },
  { name: "Active Connections", value: "2,329", icon: Network },
]

export default function InfrastructurePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Infrastructure</h1>
          <p className="text-muted-foreground">Monitor and scale your cloud infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Scale className="mr-2 h-4 w-4" />
            Auto-Scale Settings
          </Button>
          <Button>Scale Resources</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {infrastructure.map((item) => (
          <Card key={item.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.name}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regional Deployment */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Deployment</CardTitle>
          <CardDescription>Server clusters across global regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {regions.map((region) => (
              <div key={region.code} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{region.name}</span>
                        <Badge
                          variant={region.status === "operational" ? "default" : "secondary"}
                          className={
                            region.status === "operational"
                              ? "bg-success text-success-foreground"
                              : "bg-warning text-warning-foreground"
                          }
                        >
                          {region.status === "operational" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {region.status === "degraded" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {region.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {region.servers} servers • {region.latency}ms latency
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="grid gap-4 pl-8 md:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        CPU Usage
                      </span>
                      <span className="text-muted-foreground">{region.cpu}%</span>
                    </div>
                    <Progress value={region.cpu} />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4" />
                        Memory Usage
                      </span>
                      <span className="text-muted-foreground">{region.memory}%</span>
                    </div>
                    <Progress value={region.memory} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Instances */}
      <Card>
        <CardHeader>
          <CardTitle>Database Instances</CardTitle>
          <CardDescription>Manage database clusters and connections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {databases.map((db) => (
              <div key={db.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-4">
                  <Database className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{db.name}</span>
                      <Badge variant="outline">{db.type}</Badge>
                      <Badge variant="default" className="bg-success text-success-foreground">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {db.status}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {db.region} • {db.size} • {db.connections}/{db.maxConnections} connections
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">CPU</div>
                    <div className="font-medium">{db.cpu}%</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
