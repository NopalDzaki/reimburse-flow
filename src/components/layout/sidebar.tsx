"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  badge?: number
}

interface SidebarProps {
  navItems: NavItem[]
  basePath: string
}

export function Sidebar({ navItems, basePath }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 flex h-screen w-64 flex-col border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Brand */}
      <div className="flex h-16 items-center px-6 border-b border-border/50">
        <Link href={`${basePath}/dashboard`} className="flex items-center gap-2 font-heading font-bold text-lg tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-xl">R</span>
          </div>
          ReimburseFlow
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border-l-2 border-transparent"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.title}
              </div>
              {item.badge && item.badge > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}

        {/* Generic primary CTA hook for sidebar, usually "Submit Claim" for User/Admin */}
        {basePath.includes('user') && (
           <div className="mt-8 px-2">
             <Button variant="gradient" className="w-full justify-center shadow-lg shadow-primary/20" asChild>
               <Link href="/user/submit">
                  + New Reimbursement
               </Link>
             </Button>
           </div>
        )}
      </nav>

      {/* Footer / Settings */}
      <div className="border-t border-border/50 p-4 space-y-1">
        <Link
          href={`${basePath}/settings`}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </aside>
  )
}
