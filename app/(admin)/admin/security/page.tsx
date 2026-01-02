"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Ban,
  RefreshCw,
  Download,
  Search,
  Smartphone,
  Monitor,
  MapPin,
} from "lucide-react"

const securityAlerts = [
  {
    id: 1,
    type: "critical",
    message: "Brute force attack detected from IP 192.168.1.100",
    time: "2 min ago",
    resolved: false,
  },
  {
    id: 2,
    type: "warning",
    message: "Unusual login pattern for user admin@workspace.io",
    time: "15 min ago",
    resolved: false,
  },
  { id: 3, type: "warning", message: "API rate limit exceeded for client mob_xxx", time: "1 hour ago", resolved: true },
  { id: 4, type: "info", message: "New device login for super_admin", time: "3 hours ago", resolved: true },
  { id: 5, type: "critical", message: "Failed login attempts threshold reached", time: "5 hours ago", resolved: true },
]

const activeSessions = [
  {
    id: 1,
    user: "admin@platform.com",
    device: "Chrome on macOS",
    ip: "192.168.1.50",
    location: "San Francisco, US",
    lastActive: "Now",
    current: true,
  },
  {
    id: 2,
    user: "admin@platform.com",
    device: "Safari on iPhone",
    ip: "192.168.1.51",
    location: "San Francisco, US",
    lastActive: "5 min ago",
    current: false,
  },
  {
    id: 3,
    user: "security@platform.com",
    device: "Firefox on Windows",
    ip: "10.0.0.25",
    location: "New York, US",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 4,
    user: "ops@platform.com",
    device: "Chrome on Linux",
    ip: "172.16.0.100",
    location: "London, UK",
    lastActive: "4 hours ago",
    current: false,
  },
]

const blockedIPs = [
  { ip: "192.168.1.100", reason: "Brute force attack", blockedAt: "2 hours ago", expires: "24 hours", requests: 15420 },
  { ip: "10.0.0.50", reason: "Suspicious activity", blockedAt: "1 day ago", expires: "7 days", requests: 8920 },
  { ip: "172.16.1.200", reason: "Rate limit abuse", blockedAt: "3 days ago", expires: "30 days", requests: 45000 },
]

const auditLogs = [
  {
    id: 1,
    action: "settings.updated",
    user: "admin@platform.com",
    resource: "Security Settings",
    ip: "192.168.1.50",
    time: "10 min ago",
  },
  {
    id: 2,
    action: "user.created",
    user: "admin@platform.com",
    resource: "ops@platform.com",
    ip: "192.168.1.50",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "api_key.rotated",
    user: "security@platform.com",
    resource: "Production API Key",
    ip: "10.0.0.25",
    time: "3 hours ago",
  },
  {
    id: 4,
    action: "workspace.suspended",
    user: "admin@platform.com",
    resource: "workspace_456",
    ip: "192.168.1.50",
    time: "5 hours ago",
  },
  {
    id: 5,
    action: "feature_flag.enabled",
    user: "admin@platform.com",
    resource: "ai_suggestions",
    ip: "192.168.1.50",
    time: "1 day ago",
  },
]

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security</h1>
          <p className="text-muted-foreground">Monitor and manage platform security settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="destructive">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Security Scan
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-green-600">94/100</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <div className="rounded-full bg-red-500/10 p-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Blocked IPs</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="rounded-full bg-orange-500/10 p-3">
                <Ban className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">2FA Adoption</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <Key className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Real-time security events and threats</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start justify-between rounded-lg border p-4 ${
                      alert.type === "critical" && !alert.resolved
                        ? "border-red-500/50 bg-red-500/5"
                        : alert.type === "warning" && !alert.resolved
                          ? "border-yellow-500/50 bg-yellow-500/5"
                          : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {alert.type === "critical" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : alert.type === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-blue-500" />
                      )}
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={alert.resolved ? "secondary" : "destructive"}>
                        {alert.resolved ? "Resolved" : "Active"}
                      </Badge>
                      {!alert.resolved && (
                        <Button variant="outline" size="sm">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Currently logged in admin sessions</CardDescription>
                </div>
                <Button variant="destructive" size="sm">
                  Revoke All Sessions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {session.user}
                          {session.current && <Badge variant="secondary">Current</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {session.device.includes("iPhone") ? (
                            <Smartphone className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                          )}
                          {session.device}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{session.ip}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {session.location}
                        </div>
                      </TableCell>
                      <TableCell>{session.lastActive}</TableCell>
                      <TableCell className="text-right">
                        {!session.current && (
                          <Button variant="ghost" size="sm">
                            Revoke
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocked" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Blocked IPs</CardTitle>
                  <CardDescription>IP addresses blocked due to suspicious activity</CardDescription>
                </div>
                <Button>
                  <Ban className="mr-2 h-4 w-4" />
                  Block IP
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Blocked At</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Blocked Requests</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedIPs.map((ip, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{ip.ip}</TableCell>
                      <TableCell>{ip.reason}</TableCell>
                      <TableCell>{ip.blockedAt}</TableCell>
                      <TableCell>{ip.expires}</TableCell>
                      <TableCell>{ip.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Unblock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>Track all administrative actions</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search logs..." className="pl-9 w-64" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Actions</SelectItem>
                      <SelectItem value="settings">Settings</SelectItem>
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="font-medium">{log.resource}</TableCell>
                      <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                      <TableCell className="text-muted-foreground">{log.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
                <CardDescription>Configure password requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Minimum Length</Label>
                  <Input type="number" defaultValue="12" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Uppercase</Label>
                    <p className="text-sm text-muted-foreground">At least one uppercase letter</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Numbers</Label>
                    <p className="text-sm text-muted-foreground">At least one number</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground">At least one special character</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Password Expiry (days)</Label>
                  <Input type="number" defaultValue="90" />
                </div>
                <Button className="w-full">Save Policy</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication Settings</CardTitle>
                <CardDescription>Configure authentication options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require 2FA for Admins</Label>
                    <p className="text-sm text-muted-foreground">All admin accounts must use 2FA</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow SSO</Label>
                    <p className="text-sm text-muted-foreground">Enable Single Sign-On</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label>Max Login Attempts</Label>
                  <Input type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label>Lockout Duration (minutes)</Label>
                  <Input type="number" defaultValue="30" />
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
