"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Settings2, Users, Globe, Zap } from "lucide-react"

const featureFlags = [
  {
    id: "ai_assistant",
    name: "AI Assistant",
    description: "AI-powered chat suggestions and auto-responses",
    enabled: true,
    rollout: 85,
    environment: ["production", "staging"],
    workspaces: 1057,
    status: "stable",
  },
  {
    id: "video_chat",
    name: "Video Chat",
    description: "Real-time video calling within conversations",
    enabled: false,
    rollout: 0,
    environment: ["staging"],
    workspaces: 0,
    status: "beta",
  },
  {
    id: "advanced_analytics",
    name: "Advanced Analytics",
    description: "Enhanced reporting with custom dashboards",
    enabled: true,
    rollout: 100,
    environment: ["production", "staging"],
    workspaces: 1247,
    status: "stable",
  },
  {
    id: "mobile_app",
    name: "Mobile App Access",
    description: "Native iOS and Android applications",
    enabled: true,
    rollout: 50,
    environment: ["production"],
    workspaces: 624,
    status: "stable",
  },
  {
    id: "custom_branding",
    name: "Custom Branding",
    description: "White-label widget customization",
    enabled: true,
    rollout: 100,
    environment: ["production"],
    workspaces: 892,
    status: "stable",
  },
  {
    id: "webhook_v2",
    name: "Webhooks V2",
    description: "New webhook system with retry logic",
    enabled: false,
    rollout: 10,
    environment: ["staging"],
    workspaces: 24,
    status: "experimental",
  },
]

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(featureFlags)

  const toggleFlag = (id: string) => {
    setFlags(flags.map((flag) => (flag.id === id ? { ...flag, enabled: !flag.enabled } : flag)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feature Flags</h1>
          <p className="text-muted-foreground">Control feature rollout and experimentation across environments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Flag
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Feature Flag</DialogTitle>
              <DialogDescription>Add a new feature flag to control rollout</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="flag-name">Flag Name</Label>
                <Input id="flag-name" placeholder="feature_name" />
              </div>
              <div>
                <Label htmlFor="flag-desc">Description</Label>
                <Textarea id="flag-desc" placeholder="Describe what this feature does..." />
              </div>
              <div>
                <Label htmlFor="environment">Environment</Label>
                <Select>
                  <SelectTrigger id="environment">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rollout">Initial Rollout %</Label>
                <Input id="rollout" type="number" min="0" max="100" defaultValue="0" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Flag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Flags</CardTitle>
            <Settings2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flags.length}</div>
            <p className="text-xs text-muted-foreground">Across all environments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Flags</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flags.filter((f) => f.enabled).length}</div>
            <p className="text-xs text-muted-foreground">Currently enabled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Affected Workspaces</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">With active flags</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Environments</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Dev, Staging, Prod</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags List */}
      <div className="space-y-4">
        {flags.map((flag) => (
          <Card key={flag.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{flag.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        flag.status === "stable"
                          ? "border-success text-success"
                          : flag.status === "beta"
                            ? "border-warning text-warning"
                            : "border-info text-info"
                      }
                    >
                      {flag.status}
                    </Badge>
                  </div>
                  <CardDescription>{flag.description}</CardDescription>
                  <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                    <span>Rollout: {flag.rollout}%</span>
                    <span>•</span>
                    <span>{flag.workspaces.toLocaleString()} workspaces</span>
                    <span>•</span>
                    <span>
                      {flag.environment.map((env) => (
                        <Badge key={env} variant="secondary" className="mr-1">
                          {env}
                        </Badge>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`toggle-${flag.id}`} className="text-sm">
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </Label>
                    <Switch
                      id={`toggle-${flag.id}`}
                      checked={flag.enabled}
                      onCheckedChange={() => toggleFlag(flag.id)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardHeader>
            {flag.enabled && (
              <CardContent>
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Rollout Progress</span>
                    <span className="text-muted-foreground">{flag.rollout}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary transition-all" style={{ width: `${flag.rollout}%` }} />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
