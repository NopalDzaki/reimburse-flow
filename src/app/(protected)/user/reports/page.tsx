"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus, Eye, Filter } from "lucide-react"

const MOCK_REPORTS = [
  { id: "TK-1042", title: "Cannot bulk approve claims in review queue", category: "Bug", priority: "high" as const, status: "in-progress" as const, time: "2 hours ago" },
  { id: "TK-1031", title: "Tax rate calculation incorrect for NY trip", category: "Reimbursement Issue", priority: "medium" as const, status: "open" as const, time: "3 days ago" },
  { id: "TK-1018", title: "Dashboard not loading on mobile Safari", category: "UI/UX Problem", priority: "low" as const, status: "resolved" as const, time: "Oct 18, 2023" },
]

export default function UserReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Reports"
        description="Issues and support tickets you have submitted to Superadmin."
        actions={
          <Link href="/user/reports/create">
            <Button variant="gradient" className="gap-2 shadow-lg shadow-primary/20">
              <MessageSquarePlus className="h-4 w-4" /> New Report
            </Button>
          </Link>
        }
      />

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" /> Filter by Status
        </Button>
        <div className="flex gap-2 flex-wrap">
          {(["open", "in-progress", "resolved"] as const).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </div>

      {MOCK_REPORTS.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="When you submit a support ticket, it will appear here."
          action={<Link href="/user/reports/create"><Button variant="default">Create First Report</Button></Link>}
        />
      ) : (
        <div className="grid gap-3">
          {MOCK_REPORTS.map((r) => (
            <div key={r.id} className="rounded-xl border border-border/50 bg-card p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{r.category}</span>
                </div>
                <p className="font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={r.priority} />
                <StatusBadge status={r.status} />
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
