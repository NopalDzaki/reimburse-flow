import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const AUDIT_ENTRIES = [
  { id: 1, actor: "system", event: "Rule Permission Changed", detail: "Superadmin updated 'Manager' role access in Acme Corp.", time: "08:12 AM TODAY", type: "info" },
  { id: 2, actor: "security", event: "Failed Login Attempt", detail: "Multiple failed attempts detected from IP 192.168.1.1.", time: "YESTERDAY, 11:45 PM", type: "error" },
  { id: 3, actor: "onboarding", event: "New Organization Registered", detail: "'Fintech Innovators' added to the global system.", time: "YESTERDAY, 04:30 PM", type: "primary" },
  { id: 4, actor: "system", event: "API Key Rotated", detail: "Global production API key was rotated successfully.", time: "OCT 12, 02:15 PM", type: "warning" },
  { id: 5, actor: "admin", event: "Claim Approved", detail: "Jordan Devlin approved claim #TXN-90210 for $1,240.00.", time: "OCT 12, 01:45 PM", type: "success" },
  { id: 6, actor: "finance", event: "Payment Issued", detail: "Riley North issued payment for claim #TXN-90210.", time: "OCT 12, 01:55 PM", type: "success" },
  { id: 7, actor: "superadmin", event: "User Role Changed", detail: "Sarah Chen's role updated from 'User' to 'Admin'.", time: "OCT 11, 09:00 AM", type: "warning" },
]

const typeStyle: Record<string, { dot: string; border: string }> = {
  info:    { dot: "bg-info", border: "border-info/40" },
  error:   { dot: "bg-destructive", border: "border-destructive/40" },
  primary: { dot: "bg-primary", border: "border-primary/40" },
  warning: { dot: "bg-warning", border: "border-warning/40" },
  success: { dot: "bg-success", border: "border-success/40" },
}

export default function SuperadminAuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Trail"
        description="Complete chronological history of all system events."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          </div>
        }
      />

      <div className="relative pl-6 space-y-0">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border/50" />
        {AUDIT_ENTRIES.map((entry, i) => {
          const style = typeStyle[entry.type] ?? typeStyle.info
          return (
            <div key={entry.id} className="relative pb-6 last:pb-0">
              <div className={`absolute -left-4 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background ${style.border}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm hover:bg-muted/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <span className="font-heading text-sm font-semibold text-foreground">{entry.event}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{entry.time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{entry.detail}</p>
                <p className="text-xs text-muted-foreground mt-1.5 opacity-60 capitalize">Source: {entry.actor}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
