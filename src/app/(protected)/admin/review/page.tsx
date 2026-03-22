"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Filter, Search, CheckCircle, XCircle } from "lucide-react"

const QUEUE = [
  { id: "TXN-90210", user: "Jordan Smith", initials: "JS", category: "Business Travel", amount: "$1,240.00", date: "Oct 24, 2023", submitted: "2 hours ago" },
  { id: "TXN-88421", user: "Mia Laurent", initials: "ML", category: "Office Supplies", amount: "$45.99", date: "Oct 23, 2023", submitted: "5 hours ago" },
  { id: "TXN-77612", user: "Robert King", initials: "RK", category: "Dining", amount: "$312.50", date: "Oct 22, 2023", submitted: "Yesterday" },
  { id: "TXN-68210", user: "Alex Chen", initials: "AC", category: "Tech/Hardware", amount: "$2,800.00", date: "Oct 22, 2023", submitted: "Yesterday" },
  { id: "TXN-55310", user: "Sam Wilson", initials: "SW", category: "Logistics", amount: "$890.00", date: "Oct 20, 2023", submitted: "3 days ago" },
]

export default function AdminReviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Queue"
        description="Pending claims awaiting your approval decision."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
            <Button variant="default" size="sm">Batch Review</Button>
          </div>
        }
      />

      <div className="flex gap-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by name or claim ID…" className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">Action Required <span className="ml-2 px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-sm font-semibold">{QUEUE.length} Claims</span></h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="px-6 py-3 font-medium">Employee</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Evidence</th>
              <th className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {QUEUE.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">{c.initials}</div>
                    <div>
                      <p className="font-medium text-foreground">{c.user}</p>
                      <p className="text-xs text-muted-foreground">{c.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-sm font-medium uppercase tracking-wider">{c.category}</span></td>
                <td className="px-6 py-4 text-muted-foreground">{c.date}</td>
                <td className="px-6 py-4 text-right font-bold text-foreground">{c.amount}</td>
                <td className="px-6 py-4"><Button variant="ghost" size="sm" className="text-primary hover:text-primary">View Receipt</Button></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:bg-success/10 hover:text-success"><CheckCircle className="h-5 w-5" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"><XCircle className="h-5 w-5" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="grid gap-3 md:hidden">
        {QUEUE.map((c) => (
          <div key={c.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold">{c.initials}</div>
                <div><p className="font-semibold text-foreground">{c.user}</p><p className="text-xs text-muted-foreground">{c.id}</p></div>
              </div>
              <span className="text-lg font-heading font-bold text-foreground">{c.amount}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-muted rounded-sm uppercase tracking-wider">{c.category}</span>
              <span>{c.submitted}</span>
            </div>
            <div className="flex gap-2 pt-1 border-t border-border/30">
              <Button variant="outline" size="sm" className="flex-1 gap-1 text-success border-success/30 hover:bg-success/10"><CheckCircle className="h-4 w-4" /> Approve</Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"><XCircle className="h-4 w-4" /> Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
