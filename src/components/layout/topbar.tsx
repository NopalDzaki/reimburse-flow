"use client"

import * as React from "react"
import { Bell, Search, User, Settings, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useNotifications } from "@/context/notification-context"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getRelativeTime } from "@/lib/utils"

interface TopbarProps {
  userName: string
  userRole: string
  avatarInitial: string
}

export function Topbar({ userName, userRole, avatarInitial }: TopbarProps) {
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications()
  const { logout } = useAuth()
  const router = useRouter()
  
  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement
      if (target.value.trim().length > 0) {
        toast.info(`Global search for "${target.value}" is not yet connected to a search engine.`)
      }
    }
  }

  // Find the role path piece for settings/profile linking. (e.g., 'superadmin' -> '/superadmin/settings')
  // userRole is uppercase string typically "USER", "ADMIN", etc.
  const routePrefix = userRole.toLowerCase()

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/50 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Left: Search (Generic) */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            onKeyDown={handleGlobalSearch}
            placeholder="Search claims, users, or tickets... (Press Enter)"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Right: Utilities */}
      <div className="flex items-center justify-end gap-4">
        <ThemeToggle />
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9">
                <Bell className="h-4 w-4 text-muted-foreground" />
              </Button>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-2 flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background"></span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 mr-4 mt-2" align="end">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <span className="font-semibold text-sm">Notifications</span>
              {notifications.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => clearAll()} className="h-8 text-xs text-muted-foreground">Clear All</Button>
              )}
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {notifications.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">No new notifications</div>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} 
                    className={`flex flex-col gap-1 p-3 rounded-lg text-sm cursor-pointer transition-colors hover:bg-muted/50 ${!n.read ? 'bg-primary/5 border border-primary/10' : ''}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium leading-none">{n.title}</span>
                      <span className="text-[10px] text-muted-foreground">{getRelativeTime(n.createdAt)}</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-snug">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-3 pl-2 border-l border-border/50">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-sm font-heading font-medium leading-none">{userName}</span>
            <span className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{userRole}</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card border border-border/50 font-medium text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                {avatarInitial}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground uppercase">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${routePrefix}/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/${routePrefix}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings & Preferences</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { logout(); toast.success("Logged out successfully"); router.push("/login"); }} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
