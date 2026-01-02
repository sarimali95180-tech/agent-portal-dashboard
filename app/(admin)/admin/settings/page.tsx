"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Database,
  Palette,
  Code,
  Clock,
  Server,
  Save,
  RefreshCw,
  Upload,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">Configure global platform settings and preferences</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="limits">Limits & Quotas</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Platform Information
                </CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input defaultValue="LiveChat Platform" />
                </div>
                <div className="space-y-2">
                  <Label>Platform URL</Label>
                  <Input defaultValue="https://app.livechat.com" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@livechat.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time (US)</SelectItem>
                      <SelectItem value="pst">Pacific Time (US)</SelectItem>
                      <SelectItem value="gmt">GMT (London)</SelectItem>
                      <SelectItem value="cet">CET (Berlin)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Defaults
                </CardTitle>
                <CardDescription>Default security settings for new workspaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enforce 2FA</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SSO Only</Label>
                    <p className="text-sm text-muted-foreground">Allow only SSO authentication</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>IP Allowlisting</Label>
                    <p className="text-sm text-muted-foreground">Enable IP restrictions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all user actions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Input type="number" defaultValue="60" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Platform Branding
                </CardTitle>
                <CardDescription>Customize platform appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline">Upload Logo</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button variant="outline">Upload Favicon</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="#6366f1" className="w-32" />
                    <div className="h-10 w-10 rounded-md bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="#ec4899" className="w-32" />
                    <div className="h-10 w-10 rounded-md bg-pink-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Custom Code
                </CardTitle>
                <CardDescription>Add custom CSS and JavaScript</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom CSS</Label>
                  <Textarea placeholder="/* Add custom CSS here */" className="font-mono min-h-32" />
                </div>
                <div className="space-y-2">
                  <Label>Custom JavaScript</Label>
                  <Textarea placeholder="// Add custom JavaScript here" className="font-mono min-h-32" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Custom Code</Label>
                    <p className="text-sm text-muted-foreground">Inject custom code into pages</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Admin Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Workspace Created</Label>
                      <p className="text-sm text-muted-foreground">Notify when a new workspace signs up</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Payment Failed</Label>
                      <p className="text-sm text-muted-foreground">Notify on payment failures</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify on security events</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Health Alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify on system issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Channels</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Slack Webhook URL</Label>
                    <Input placeholder="https://hooks.slack.com/services/..." />
                  </div>
                  <div className="space-y-2">
                    <Label>PagerDuty Integration Key</Label>
                    <Input placeholder="Enter integration key" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Recipients</Label>
                    <Input placeholder="admin@platform.com, ops@platform.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>SMS Phone Numbers</Label>
                    <Input placeholder="+1234567890, +0987654321" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Resource Limits
                </CardTitle>
                <CardDescription>Default limits for workspaces</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Max Agents per Workspace</Label>
                  <Input type="number" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label>Max Conversations per Month</Label>
                  <Input type="number" defaultValue="10000" />
                </div>
                <div className="space-y-2">
                  <Label>Max File Upload Size (MB)</Label>
                  <Input type="number" defaultValue="25" />
                </div>
                <div className="space-y-2">
                  <Label>Max Storage per Workspace (GB)</Label>
                  <Input type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label>Message History Retention (days)</Label>
                  <Input type="number" defaultValue="365" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  API Rate Limits
                </CardTitle>
                <CardDescription>Configure API rate limiting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Requests per Minute (per workspace)</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div className="space-y-2">
                  <Label>Requests per Hour (per workspace)</Label>
                  <Input type="number" defaultValue="50000" />
                </div>
                <div className="space-y-2">
                  <Label>Requests per Day (per workspace)</Label>
                  <Input type="number" defaultValue="500000" />
                </div>
                <div className="space-y-2">
                  <Label>Max Concurrent Connections</Label>
                  <Input type="number" defaultValue="500" />
                </div>
                <div className="space-y-2">
                  <Label>WebSocket Connections per Workspace</Label>
                  <Input type="number" defaultValue="200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Maintenance Mode
                </CardTitle>
                <CardDescription>Schedule and manage maintenance windows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Show maintenance page to users</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Maintenance Message</Label>
                  <Textarea
                    defaultValue="We're performing scheduled maintenance. We'll be back shortly!"
                    className="min-h-24"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expected Duration (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Admin Access</Label>
                    <p className="text-sm text-muted-foreground">Admins can bypass maintenance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Scheduled Tasks
                </CardTitle>
                <CardDescription>Automated maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Database Cleanup</Label>
                    <p className="text-sm text-muted-foreground">Remove expired data daily</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Log Rotation</Label>
                    <p className="text-sm text-muted-foreground">Rotate logs weekly</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Cache Purge</Label>
                    <p className="text-sm text-muted-foreground">Clear old cache entries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Aggregation</Label>
                    <p className="text-sm text-muted-foreground">Aggregate analytics data daily</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup</Label>
                    <p className="text-sm text-muted-foreground">Full backup every 6 hours</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Settings className="h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>These settings can affect platform stability. Proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable verbose logging</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Feature Preview</Label>
                  <p className="text-sm text-muted-foreground">Enable experimental features</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Developer Tools</Label>
                  <p className="text-sm text-muted-foreground">Show developer options in UI</p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label>Custom Environment Variables</Label>
                <Textarea placeholder="KEY=value" className="font-mono min-h-32" />
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium text-destructive mb-4">Danger Zone</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">Clear All Caches</Button>
                  <Button variant="outline">Reset Feature Flags</Button>
                  <Button variant="destructive">Purge All Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
