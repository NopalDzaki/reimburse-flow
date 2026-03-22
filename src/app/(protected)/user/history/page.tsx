import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Filter, Search, Eye } from "lucide-react"

const MOCK_CLAIMS = [
  { id: "TXN-90210", title: "Business Trip: NYC Tech Week", category: "Travel", amount: "$1,240.00", date: "Oct 24, 2023", status: "paid" as const },
  { id: "TXN-88421", title: "Client Dinner – Blue Ribbon", category: "Meals", amount: "$215.50", date: "Oct 22, 2023", status: "pending" as const },
  { id: "TXN-77612", title: "Home Office Internet – June", category: "Utilities", amount: "$85.00", date: "Oct 18, 2023", status: "approved" as const },
  { id: "TXN-11204", title: "Taxi to Airport", category: "Transport", amount: "$45.00", date: "Oct 17, 2023", status: "submitted" as const },
  { id: "TXN-68210", title: "SaaS Subscription – Figma", category: "Software", amount: "$144.00", date: "Oct 12, 2023", status: "rejected" as const },
  { id: "TXN-55310", title: "Conference Badge – DevSummit", category: "Events", amount: "$350.00", date: "Oct 6, 2023", status: "paid" as const },
]

export default function UserHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Claim History"
        description="All reimbursement requests you have submitted."
        actions={
          <Link href="/user/submit">
            <Button variant="gradient" className="gap-2 shadow-lg shadow-primary/20">+ New Claim</Button>
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search claims…" className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
        <Button variant="outline" size="sm" className="gap-2 shrink-0">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/50">
            <tr className="text-xs uppercase text-muted-foreground bg-muted/40">
              <th className="px-6 py-3 font-medium">ID / Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {MOCK_CLAIMS.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.id}</p>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{c.category}</td>
                <td className="px-6 py-4 text-muted-foreground">{c.date}</td>
                <td className="px-6 py-4 text-right font-semibold text-foreground">{c.amount}</td>
                <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="grid gap-3 md:hidden">
        {MOCK_CLAIMS.map((c) => (
          <div key={c.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.id} • {c.category}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-heading font-bold text-foreground">{c.amount}</span>
              <span className="text-xs text-muted-foreground">{c.date}</span>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" /> View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
