import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { CheckCircle2, Clock3, AlertTriangle, Filter } from "lucide-react"

const ACTION_QUEUE = [
  { id: "TXN-55410", employee: "Alex Sterling", amount: "$1,240", age: "2h", status: "submitted" as const, risk: "urgent" as const, reason: "Missing itemized receipt" },
  { id: "TXN-88421", employee: "Morgan Lane", amount: "$432", age: "35m", status: "pending" as const, risk: "high" as const, reason: "Policy exception: Meal cap" },
  { id: "TXN-11204", employee: "Riley North", amount: "$890", age: "4h", status: "submitted" as const, risk: "medium" as const, reason: "Out-of-region expense" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">Review Queue</h1>
        <p className="text-muted-foreground">Monitor and process pending employee claims.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending Review</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">24</h2>
            <span className="text-sm font-medium text-destructive">+5 new</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Requires manager approval</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Reviewed Today</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">12</h2>
            <span className="text-sm font-medium text-muted-foreground">85% quota</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Completion rate today</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avg. Processing</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">4h</h2>
            <span className="text-sm font-medium text-success">-12% vs last week</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Submission to decision</p>
        </div>
      </div>
      
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-heading font-semibold">Action Required</h3>
            <Badge variant="destructive" className="rounded-full">{ACTION_QUEUE.length} urgent</Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="secondary" size="sm" className="gap-2"><CheckCircle2 className="h-4 w-4" /> Auto-approve safe</Button>
          </div>
        </div>

        {ACTION_QUEUE.length === 0 && (
          <EmptyState title="No items pending" description="You're caught up. We'll notify you when new claims arrive." />
        )}

        <div className="grid gap-3">
          {ACTION_QUEUE.map((item) => (
            <div key={item.id} className="rounded-lg border border-border/50 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="font-heading font-semibold text-foreground">{item.employee}</p>
                <p className="text-xs text-muted-foreground">{item.id} • {item.reason}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 className="h-4 w-4" /> Waiting {item.age}
                  <StatusBadge status={item.status} />
                  <Badge variant="outline" className="rounded-full">{item.amount}</Badge>
                  {item.risk === "urgent" && <Badge variant="destructive" className="rounded-full">Urgent</Badge>}
                  {item.risk === "high" && <Badge variant="secondary" className="rounded-full">High</Badge>}
                  {item.risk === "medium" && <Badge variant="outline" className="rounded-full">Check</Badge>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Request docs</Button>
                <Button variant="secondary" size="sm">Approve</Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><AlertTriangle className="h-4 w-4" /> Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
