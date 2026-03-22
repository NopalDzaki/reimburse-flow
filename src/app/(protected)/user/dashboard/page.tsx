import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { Eye, Clock3, Download, Send } from "lucide-react"

const RECENT_CLAIMS = [
  { id: "TXN-90210", title: "NYC Tech Week", date: "Oct 24", amount: "$1,240", status: "paid" as const, category: "Travel" },
  { id: "TXN-88421", title: "Client Dinner", date: "Oct 22", amount: "$215.50", status: "pending" as const, category: "Meals" },
  { id: "TXN-77612", title: "Home Office Internet", date: "Oct 18", amount: "$85.00", status: "approved" as const, category: "Utilities" },
]

const ACTIVITY = [
  { time: "Today • 09:20", label: "Finance released payment for TXN-90210", tone: "success" },
  { time: "Today • 08:05", label: "Admin approved TXN-77612", tone: "info" },
  { time: "Yesterday", label: "Reminder: Upload missing receipt for TXN-88421", tone: "warn" },
]

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">Hello, Alex!</h1>
        <p className="text-muted-foreground">Your reimbursements at a glance, ready for quick actions.</p>
      </div>
      
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Submitted</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">$4,250.00</h2>
            <span className="text-sm font-medium text-success">+12% vs last month</span>
          </div>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Pending Review</p>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-heading font-bold text-warning">$840.00</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-destructive"></span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">3 items need receipts</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Approved & Paid</p>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-heading font-bold text-info">$3,410.00</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-info"></span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Payout released yesterday</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Two Column Layout for Recent Activity */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold">Recent Reimbursements</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <a href="/user/history">View all</a>
              </Button>
            </div>
          </div>

          <div className="hidden md:block rounded-lg border border-border/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Claim</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {RECENT_CLAIMS.map((claim) => (
                  <tr key={claim.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{claim.title}</p>
                      <p className="text-xs text-muted-foreground">{claim.id}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{claim.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{claim.date}</td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">{claim.amount}</td>
                    <td className="px-4 py-3"><StatusBadge status={claim.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 md:hidden">
            {RECENT_CLAIMS.map((claim) => (
              <div key={claim.id} className="rounded-lg border border-border/50 p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{claim.title}</p>
                    <p className="text-xs text-muted-foreground">{claim.id} • {claim.category}</p>
                  </div>
                  <StatusBadge status={claim.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{claim.date}</span>
                  <span className="text-xl font-heading font-bold">{claim.amount}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Eye className="h-4 w-4" /> View
                </Button>
              </div>
            ))}
          </div>

          {RECENT_CLAIMS.length === 0 && (
            <EmptyState title="No reimbursements yet" description="Submit your first claim to see it here." action={<Button asChild><a href="/user/submit">Submit a claim</a></Button>} />
          )}
        </div>

        <div className="md:col-span-3 rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-semibold">Recent Activity</h3>
            <Badge variant="secondary" className="rounded-full">Live</Badge>
          </div>

          <div className="space-y-3">
            {ACTIVITY.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-lg border border-border/50 px-3 py-3">
                <div className="mt-0.5">
                  {item.tone === "success" && <span className="h-2 w-2 rounded-full bg-success block" />}
                  {item.tone === "info" && <span className="h-2 w-2 rounded-full bg-info block" />}
                  {item.tone === "warn" && <span className="h-2 w-2 rounded-full bg-warning block" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                {item.tone === "warn" && <Button variant="outline" size="sm" className="gap-2"><Send className="h-4 w-4" /> Upload</Button>}
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border/50 p-4 bg-muted/40 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground font-semibold"><Clock3 className="h-4 w-4" /> Upcoming payout</div>
            <p className="text-sm text-foreground font-semibold">$1,240.00 arriving today by 4:00 PM</p>
            <p>Need changes? Pause or update bank info before cutoff.</p>
            <Button variant="secondary" size="sm" className="gap-2 w-full sm:w-auto">
              Update bank details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
