"use client"

import * as React from "react"
import { Filter, MoreVertical, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TicketDashboardPage() {
  const tickets = [
    { id: "TK-1042", user: "Jordan Smith", role: "Manager", subject: "Cannot bulk approve claims", priority: "High", status: "Open", time: "2 hours ago" },
    { id: "TK-1041", user: "Mia Laurent", role: "Employee", subject: "Tax rate calculation wrong for NY trip", priority: "Medium", status: "In Progress", time: "Yesterday" },
    { id: "TK-1039", user: "Alex Chen", role: "Finance", subject: "Stripe payout integration failing", priority: "Urgent", status: "Open", time: "2 days ago" },
    { id: "TK-1035", user: "Sarah V.", role: "Employee", subject: "Password reset not sending to email", priority: "Low", status: "Resolved", time: "Oct 24" },
  ]

  const getPriorityBadge = (p: string) => {
    switch(p) {
      case 'Urgent': return <Badge variant="destructive">{p}</Badge>;
      case 'High': return <Badge variant="warning">{p}</Badge>;
      case 'Medium': return <Badge variant="info">{p}</Badge>;
      default: return <Badge variant="secondary">{p}</Badge>;
    }
  }

  const getStatusBadge = (s: string) => {
    switch(s) {
      case 'Open': return <span className="flex items-center gap-1.5 text-sm font-medium text-info"><span className="h-2 w-2 rounded-full bg-info"></span>Open</span>;
      case 'In Progress': return <span className="flex items-center gap-1.5 text-sm font-medium text-warning"><span className="h-2 w-2 rounded-full bg-warning"></span>In Progress</span>;
      case 'Resolved': return <span className="flex items-center gap-1.5 text-sm font-medium text-success"><span className="h-2 w-2 rounded-full bg-success"></span>Resolved</span>;
      default: return <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><span className="h-2 w-2 rounded-full bg-muted-foreground"></span>Closed</span>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-heading font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and resolve internal system reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Open Tickets</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold text-info">24</h2>
          </div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Urgent/High</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold text-destructive">7</h2>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket / Reporter</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{ticket.id}</span>
                        <span className="text-muted-foreground">{ticket.user} • {ticket.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{ticket.subject}</span>
                      <div className="text-muted-foreground mt-0.5">{ticket.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(ticket.priority)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(ticket.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="hidden group-hover:flex items-center gap-1.5 text-primary">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
