"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Calendar,
  Clock,
  Database,
  Lock,
  Eye,
  Trash2,
} from "lucide-react"

const complianceFrameworks = [
  { name: "GDPR", status: "compliant", score: 98, lastAudit: "Dec 1, 2025", nextAudit: "Mar 1, 2026" },
  { name: "SOC 2 Type II", status: "compliant", score: 95, lastAudit: "Nov 15, 2025", nextAudit: "Nov 15, 2026" },
  { name: "HIPAA", status: "in-progress", score: 78, lastAudit: "Oct 1, 2025", nextAudit: "Jan 1, 2026" },
  { name: "ISO 27001", status: "compliant", score: 92, lastAudit: "Sep 20, 2025", nextAudit: "Sep 20, 2026" },
  { name: "PCI DSS", status: "compliant", score: 100, lastAudit: "Nov 1, 2025", nextAudit: "Nov 1, 2026" },
  { name: "CCPA", status: "compliant", score: 96, lastAudit: "Oct 15, 2025", nextAudit: "Apr 15, 2026" },
]

const dataRequests = [
  {
    id: "REQ-001",
    type: "Data Export",
    user: "user@example.com",
    workspace: "Acme Corp",
    status: "completed",
    date: "Dec 3, 2025",
  },
  {
    id: "REQ-002",
    type: "Data Deletion",
    user: "john@company.io",
    workspace: "TechStart",
    status: "pending",
    date: "Dec 4, 2025",
  },
  {
    id: "REQ-003",
    type: "Data Export",
    user: "admin@enterprise.com",
    workspace: "Enterprise Inc",
    status: "processing",
    date: "Dec 5, 2025",
  },
  {
    id: "REQ-004",
    type: "Right to Rectification",
    user: "sarah@startup.co",
    workspace: "Startup Co",
    status: "completed",
    date: "Dec 2, 2025",
  },
]

const retentionPolicies = [
  { dataType: "Chat Messages", retention: "2 years", autoDelete: true, encrypted: true },
  { dataType: "User Accounts", retention: "Until deletion request", autoDelete: false, encrypted: true },
  { dataType: "Analytics Data", retention: "1 year", autoDelete: true, encrypted: false },
  { dataType: "Audit Logs", retention: "7 years", autoDelete: false, encrypted: true },
  { dataType: "File Attachments", retention: "1 year", autoDelete: true, encrypted: true },
  { dataType: "Session Logs", retention: "90 days", autoDelete: true, encrypted: false },
]

const complianceChecks = [
  { name: "Data Encryption at Rest", status: "pass", category: "Security" },
  { name: "Data Encryption in Transit", status: "pass", category: "Security" },
  { name: "Access Control Policies", status: "pass", category: "Security" },
  { name: "Audit Logging Enabled", status: "pass", category: "Monitoring" },
  { name: "Backup Procedures", status: "pass", category: "Disaster Recovery" },
  { name: "Incident Response Plan", status: "pass", category: "Operations" },
  { name: "Employee Training", status: "warning", category: "HR" },
  { name: "Vendor Management", status: "pass", category: "Operations" },
  { name: "Data Processing Agreements", status: "pass", category: "Legal" },
  { name: "Privacy Policy Updated", status: "pass", category: "Legal" },
]

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance</h1>
          <p className="text-muted-foreground">Manage regulatory compliance and data governance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Audit
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold text-green-600">94%</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Frameworks</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="rounded-full bg-orange-500/10 p-3">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Audit</p>
                <p className="text-2xl font-bold">26 days</p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="frameworks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
          <TabsTrigger value="retention">Data Retention</TabsTrigger>
          <TabsTrigger value="checks">Compliance Checks</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">{framework.name}</CardTitle>
                  <Badge variant={framework.status === "compliant" ? "default" : "secondary"}>
                    {framework.status === "compliant" ? "Compliant" : "In Progress"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Compliance Score</span>
                      <span className="font-medium">{framework.score}%</span>
                    </div>
                    <Progress value={framework.score} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Audit</p>
                      <p className="font-medium">{framework.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Audit</p>
                      <p className="font-medium">{framework.nextAudit}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Subject Requests</CardTitle>
                  <CardDescription>GDPR and privacy-related data requests</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Workspace</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono">{request.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {request.type === "Data Export" && <Download className="h-4 w-4 text-muted-foreground" />}
                          {request.type === "Data Deletion" && <Trash2 className="h-4 w-4 text-muted-foreground" />}
                          {request.type === "Right to Rectification" && (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          {request.type}
                        </div>
                      </TableCell>
                      <TableCell>{request.user}</TableCell>
                      <TableCell>{request.workspace}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "completed"
                              ? "default"
                              : request.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{request.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Retention Policies</CardTitle>
                  <CardDescription>Configure how long data is retained</CardDescription>
                </div>
                <Button>Edit Policies</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Type</TableHead>
                    <TableHead>Retention Period</TableHead>
                    <TableHead>Auto Delete</TableHead>
                    <TableHead>Encrypted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retentionPolicies.map((policy, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          {policy.dataType}
                        </div>
                      </TableCell>
                      <TableCell>{policy.retention}</TableCell>
                      <TableCell>
                        <Badge variant={policy.autoDelete ? "default" : "secondary"}>
                          {policy.autoDelete ? "Enabled" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {policy.encrypted ? (
                          <Lock className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checks" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Checklist</CardTitle>
                  <CardDescription>Automated compliance checks and status</CardDescription>
                </div>
                <Button variant="outline">Run All Checks</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-3">
                      {check.status === "pass" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">{check.category}</p>
                      </div>
                    </div>
                    <Badge variant={check.status === "pass" ? "default" : "secondary"}>
                      {check.status === "pass" ? "Passed" : "Warning"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
