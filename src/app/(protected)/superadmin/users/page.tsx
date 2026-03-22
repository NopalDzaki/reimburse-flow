import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react"

const USERS = [
  { id: 1, name: "Jordan Devlin", email: "jordan@acme.corp", role: "Admin", dept: "Engineering", status: "Active", lastLogin: "Today, 09:42 AM" },
  { id: 2, name: "Sarah Chen", email: "s.chen@fintech.io", role: "User", dept: "Marketing", status: "Active", lastLogin: "Yesterday" },
  { id: 3, name: "Marcus Knight", email: "knight@reimburse.me", role: "Finance", dept: "Finance", status: "Active", lastLogin: "3 days ago" },
  { id: 4, name: "Priya Singh", email: "priya@acme.corp", role: "User", dept: "Design", status: "Inactive", lastLogin: "Oct 10, 2023" },
  { id: 5, name: "Tom Walsh", email: "t.walsh@reimburse.me", role: "Admin", dept: "Operations", status: "Active", lastLogin: "Oct 12, 2023" },
]

const roleColors: Record<string, string> = {
  Admin: "bg-warning/10 text-warning",
  User: "bg-primary/10 text-primary",
  Finance: "bg-info/10 text-info",
  Superadmin: "bg-destructive/10 text-destructive",
}

export default function SuperadminUsersPageFull() {
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
          <input placeholder="Search users…" className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <Button variant="outline" size="sm" className="gap-2 shrink-0"><Filter className="h-4 w-4" /> Filter by Role</Button>
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
            {USERS.map((u) => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">
                      {u.name.split(" ").map(n => n[0]).join("").substring(0,2)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-sm text-xs font-semibold ${roleColors[u.role] ?? "bg-muted text-muted-foreground"}`}>{u.role}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{u.dept}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${u.status === "Active" ? "text-success" : "text-muted-foreground"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${u.status === "Active" ? "bg-success" : "bg-muted-foreground"}`} />
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{u.lastLogin}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
