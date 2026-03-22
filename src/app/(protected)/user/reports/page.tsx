"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { MessageSquarePlus, Eye, Filter } from "lucide-react"
import { useReports } from "@/context/report-context"
import { useAuth } from "@/context/auth-context"
import { getRelativeTime } from "@/lib/utils"

export default function UserReportsPage() {
  const { user } = useAuth()
  const { reports } = useReports()
  const viewableReports = reports.filter(r => r.submittedBy === user?.id)

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
      </div>

      {viewableReports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="When you submit a support ticket, it will appear here."
          action={<Link href="/user/reports/create"><Button variant="default">Create First Report</Button></Link>}
        />
      ) : (
        <div className="grid gap-3">
          {viewableReports.map((r) => (
            <div key={r.id} className="rounded-xl border border-border/50 bg-card p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{r.category}</span>
                </div>
                <p className="font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{getRelativeTime(r.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={r.priority} />
                <StatusBadge status={r.status} />
                <Button asChild variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-primary hover:text-primary">
                  <Link href={`/user/reports/${r.id}`}><Eye className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
