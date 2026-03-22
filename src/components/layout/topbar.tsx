"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  userName: string
  userRole: string
  avatarInitial: string
}

export function Topbar({ userName, userRole, avatarInitial }: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Left: Search (Generic) */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search claims, users, or tickets..."
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Right: Utilities */}
      <div className="flex items-center justify-end gap-4">
        <ThemeToggle />
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </Button>
          {/* Mock notification badge */}
          <span className="absolute top-1.5 right-2 flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-border/50">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-heading font-medium leading-none">{userName}</span>
            <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{userRole}</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border/50 font-medium text-sm text-foreground">
            {avatarInitial}
          </div>
        </div>
      </div>
    </header>
  )
}
