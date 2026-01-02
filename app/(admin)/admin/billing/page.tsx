"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Download, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const revenueData = [
  { label: "MRR", value: "$127,450", change: "+18%", trend: "up" },
  { label: "ARR", value: "$1.53M", change: "+22%", trend: "up" },
  { label: "Total Customers", value: "847", change: "+12%", trend: "up" },
  { label: "Churn Rate", value: "2.3%", change: "-0.5%", trend: "down" },
]

const recentTransactions = [
  {
    id: "INV-2024-001",
    workspace: "Acme Corp",
    amount: "$299",
    plan: "Enterprise",
    status: "paid",
    date: "Jan 15, 2024",
  },
  {
    id: "INV-2024-002",
    workspace: "TechStart",
    amount: "$99",
    plan: "Professional",
    status: "paid",
    date: "Jan 15, 2024",
  },
  {
    id: "INV-2024-003",
    workspace: "Shopify Support",
    amount: "$299",
    plan: "Enterprise",
    status: "pending",
    date: "Jan 14, 2024",
  },
  {
    id: "INV-2024-004",
    workspace: "Startup Inc",
    amount: "$29",
    plan: "Starter",
    status: "failed",
    date: "Jan 14, 2024",
  },
  {
    id: "INV-2024-005",
    workspace: "Enterprise Co",
    amount: "$299",
    plan: "Enterprise",
    status: "paid",
    date: "Jan 13, 2024",
  },
]

const planDistribution = [
  { name: "Enterprise", count: 134, revenue: "$39,866", percentage: 68 },
  { name: "Professional", count: 298, revenue: "$29,502", percentage: 23 },
  { name: "Starter", count: 415, revenue: "$12,035", percentage: 9 },
]

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing & Revenue</h1>
          <p className="text-muted-foreground">Monitor revenue and subscription metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Stripe
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {revenueData.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>{item.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Revenue breakdown by subscription tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planDistribution.map((plan) => (
              <div key={plan.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{plan.name}</span>
                    <Badge variant="secondary">{plan.count} customers</Badge>
                  </div>
                  <span className="font-semibold">{plan.revenue}</span>
                </div>
                <Progress value={plan.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly recurring revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {[65, 72, 68, 78, 85, 82, 90, 88, 95, 92, 98, 100].map((height, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-primary transition-all hover:opacity-80"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest billing activity across all workspaces</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Workspace</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>{transaction.workspace}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.plan}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "paid"
                          ? "default"
                          : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
