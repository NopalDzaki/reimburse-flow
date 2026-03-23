"use client";

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react"

import { useUsers } from "@/context/user-context"
import { getRelativeTime } from "@/lib/utils"
import { toast } from "sonner"

const roleColors: Record<string, string> = {
  Admin: "bg-warning/10 text-warning",
  User: "bg-primary/10 text-primary",
  Finance: "bg-info/10 text-info",
  Superadmin: "bg-destructive/10 text-destructive",
}

export default function SuperadminUsersPageFull() {
  const { users } = useUsers()
  const [search, setSearch] = React.useState("")

  const filteredUsers = users.filter(u => 
    search === "" || 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage system users, roles, and access levels."
        actions={
          <Button variant="gradient" className="gap-2 shadow-lg shadow-primary/20">
            <UserPlus className="h-4 w-4" /> Add User
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search users…" 
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 shrink-0" disabled><Filter className="h-4 w-4" /> Filter by Role</Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="px-6 py-3 font-medium">User</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Department</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Last Login</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground uppercase">
                      {u.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-sm text-xs font-semibold capitalize ${roleColors[u.role.charAt(0).toUpperCase() + u.role.slice(1)] ?? roleColors.User}`}>{u.role}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">-</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${u.isActive ? "text-success" : "text-muted-foreground"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${u.isActive ? "bg-success" : "bg-muted-foreground"}`} />
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{getRelativeTime(u.createdAt)}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info("User details coming soon")}><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
