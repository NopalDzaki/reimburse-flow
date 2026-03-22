import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, MoreVertical } from "lucide-react"

const CLAIMS = [
  { id: "TXN-90210", user: "Alex Sterling", role: "User", category: "Travel", amount: "$1,240.00", date: "Oct 24", status: "paid" as const },
  { id: "TXN-88421", user: "Morgan Lane", role: "User", category: "Meals", amount: "$432.50", date: "Oct 23", status: "pending" as const },
  { id: "TXN-77612", user: "Jordan Wells", role: "Admin", category: "SaaS", amount: "$2,100.00", date: "Oct 22", status: "approved" as const },
  { id: "TXN-68210", user: "Alex Chen", role: "User", category: "Hardware", amount: "$2,800.00", date: "Oct 22", status: "rejected" as const },
  { id: "TXN-55310", user: "Riley North", role: "Finance", category: "Logistics", amount: "$890.00", date: "Oct 20", status: "paid" as const },
  { id: "TXN-44210", user: "Sarah V.", role: "User", category: "Travel", amount: "$320.00", date: "Oct 18", status: "submitted" as const },
]

export default function SuperadminClaimsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="All Claims" description="Global view of every reimbursement across all roles." />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by name, ID, or category…" className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <Button variant="outline" size="sm" className="gap-2 shrink-0"><Filter className="h-4 w-4" /> Filter</Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="px-6 py-3 font-medium">Claim ID</th>
              <th className="px-6 py-3 font-medium">Employee</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {CLAIMS.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{c.id}</td>
                <td className="px-6 py-4 font-medium text-foreground">{c.user}</td>
                <td className="px-6 py-4"><span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-sm font-medium">{c.role}</span></td>
                <td className="px-6 py-4 text-muted-foreground">{c.category}</td>
                <td className="px-6 py-4 text-right font-bold text-foreground">{c.amount}</td>
                <td className="px-6 py-4 text-muted-foreground text-xs">{c.date}</td>
                <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                <td className="px-6 py-4"><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
