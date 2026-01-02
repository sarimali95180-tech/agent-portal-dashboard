"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  LineChart,
  Flag,
  Boxes,
  Activity,
  Database,
  Webhook,
  Lock,
  Globe,
  Zap,
  FileCode,
  Server,
  Settings,
  Shield,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "System Health", href: "/admin/health", icon: Activity, badge: "Live" },
  { name: "Agent Management", href: "/admin/workspaces", icon: Building2 },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Billing & Revenue", href: "/admin/billing", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: LineChart },
  { name: "Feature Flags", href: "/admin/feature-flags", icon: Flag, badge: "Beta" },
  { name: "Deployments", href: "/admin/deployments", icon: Boxes },
  { name: "Infrastructure", href: "/admin/infrastructure", icon: Server },
  { name: "Database", href: "/admin/database", icon: Database },
  { name: "API Management", href: "/admin/api", icon: FileCode },
  { name: "Webhooks", href: "/admin/webhooks", icon: Webhook },
  { name: "Email System", href: "/admin/email", icon: Mail },
  { name: "Integrations", href: "/admin/integrations", icon: Zap },
  { name: "Security", href: "/admin/security", icon: Shield },
  { name: "Compliance", href: "/admin/compliance", icon: Lock },
  { name: "Regions", href: "/admin/regions", icon: Globe },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold">Admin Portal</div>
            <div className="text-xs text-muted-foreground">System Control</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Admin Info + Logout */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-md bg-muted/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-semibold text-primary">SA</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Sterlings</div>
            <div className="text-xs text-muted-foreground truncate">
              admin@sterlings.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
