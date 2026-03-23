"use client";

import { useUsers } from "@/context/user-context"
import { useReports } from "@/context/report-context"
import { useActivity } from "@/context/activity-context"
import { useReimbursements } from "@/context/reimbursement-context"
import { getRelativeTime, formatDateID } from "@/lib/utils"
import Link from "next/link"

export default function SuperadminDashboardPage() {
  const { users } = useUsers()
  const { reports } = useReports()
  const { activities } = useActivity()
  const { reimbursements } = useReimbursements()

  const openTicketsCount = reports.filter(r => r.status === "open").length
  const urgentTickets = reports.filter(r => r.status === "open" && r.priority === "high").length
  const activeUsersCount = users.filter(u => u.isActive).length

  // Map activities to audit log format
  const auditLogs = activities.slice(0, 10).map((a, idx) => {
    let color = "text-primary"
    let bg = "bg-primary/10"
    if (a.type === "rejection") { color = "text-destructive"; bg = "bg-destructive/10" }
    if (a.type === "approval" || a.type === "payment") { color = "text-success"; bg = "bg-success/10" }
    if (a.type === "report") { color = "text-warning"; bg = "bg-warning/10" }
    
    return {
      id: a.id || String(idx),
      text: a.description,
      time: getRelativeTime(a.createdAt).toUpperCase(),
      type: a.title,
      color,
      bg
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">System Authority</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-heading font-bold tracking-tight">Superadmin Dashboard</h1>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="flex h-2 w-2 rounded-full bg-success"></span>System Live</span>
            <span className="uppercase tracking-wider">REAL-TIME DATA</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Users</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">{users.length}</h2>
          </div>
          <p className="text-sm font-medium text-success mt-2">↗ {activeUsersCount} active now</p>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Claims</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">{reimbursements.length}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Historical volume</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">System Uptime</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">99.9%</h2>
          </div>
          <p className="text-sm font-medium text-success mt-2 flex items-center gap-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-success/20 items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-success"></span></span> Operational
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Open Tickets</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">{openTicketsCount}</h2>
          </div>
          {urgentTickets > 0 ? (
            <p className="text-sm font-medium text-destructive mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-destructive/10">
              ⚠️ {urgentTickets} urgent escalations
            </p>
          ) : (
            <p className="text-sm font-medium text-success mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-success/10">
              No urgent issues
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm h-full max-h-[460px] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-heading font-semibold">User Directory</h3>
               <Link href="/superadmin/users" className="text-sm text-primary font-medium hover:underline cursor-pointer">View All</Link>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-l-lg">Name</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium text-right rounded-r-lg">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {users.slice(0, 5).map((u) => (
                    <tr key={u.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-sm font-semibold uppercase ${u.role === "admin" ? "bg-info/10 text-info" : u.role === "superadmin" ? "bg-primary/10 text-primary" : u.role === "finance" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-right">{formatDateID(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col h-full max-h-[460px] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-heading font-semibold">Live Audit Log</h3>
          </div>
          
          <div className="flex-1 relative space-y-6 overflow-y-auto pr-2 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4">
                <div className={`absolute left-0 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-4 ring-background z-10 ${log.color}`}>
                   <div className={`h-2.5 w-2.5 rounded-full ${log.bg} border border-current`}></div>
                </div>
                <div className="pl-8 flex flex-col w-full">
                   <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">{log.time}</span>
                   <span className={`text-sm font-semibold font-heading mb-0.5 ${log.color}`}>{log.type}</span>
                   <p className="text-xs text-muted-foreground leading-relaxed">{log.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

