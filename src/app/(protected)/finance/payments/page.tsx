"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Download, Clock3, ShieldCheck, ArrowRight, Search } from "lucide-react"
import { useReimbursements } from "@/context/reimbursement-context"
import { formatCurrencyIDR, getRelativeTime } from "@/lib/utils"
import { toast } from "sonner"

export default function FinancePaymentsPage() {
  const { reimbursements } = useReimbursements()
  const [search, setSearch] = React.useState("")

  const paymentQueueRaw = reimbursements.filter(r => r.status === "approved_admin")
  const paymentQueue = paymentQueueRaw.filter(r => 
    search === "" || 
    (r.accountHolderName && r.accountHolderName.toLowerCase().includes(search.toLowerCase())) || 
    r.id.toLowerCase().includes(search.toLowerCase())
  )
  
  const completedQueue = reimbursements.filter(r => r.status === "paid")

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payment Queue"
        description="Approve, schedule, and release reimbursements with audit-ready context."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Advanced filters coming soon")}>
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="secondary" size="sm" className="gap-2" onClick={() => toast.success("Exporting payment queue to CSV...")}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="rounded-full">Ready: {paymentQueueRaw.length}</Badge>
              <Badge variant="outline" className="rounded-full">Pending Docs: 0</Badge>
              <Badge variant="destructive" className="rounded-full">High Risk: 0</Badge>
              <span className="text-xs text-muted-foreground">SLA target: <strong>4h</strong> to payout</span>
            </div>
            
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search by name or claim ID…"
                className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Recipient</th>
                    <th className="px-6 py-3 font-semibold">Bank Target</th>
                    <th className="px-6 py-3 font-semibold">Schedule</th>
                    <th className="px-6 py-3 font-semibold text-right">Amount</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {paymentQueue.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{item.accountHolderName}</span>
                          <span className="text-xs text-muted-foreground">{item.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{item.bankName}</td>
                      <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        Today
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-foreground">{formatCurrencyIDR(item.amount)}</td>
                      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button asChild variant="outline" size="sm"><Link href={`/finance/payments/${item.id}`}>Details</Link></Button>
                        <Button asChild variant="secondary" size="sm"><Link href={`/finance/payments/${item.id}`}>Issue</Link></Button>
                      </td>
                    </tr>
                  ))}
                  {paymentQueue.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        {search !== "" ? "No payments found matching your search." : "No payments pending."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-3 md:hidden">
            {paymentQueue.map((item) => (
              <div key={item.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">{item.id}</span>
                    <p className="text-lg font-heading font-semibold text-foreground">{item.accountHolderName}</p>
                    <p className="text-xs text-muted-foreground">{item.bankName}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    Today
                  </div>
                  <span className="text-xl font-heading font-bold text-foreground">{formatCurrencyIDR(item.amount)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" size="sm"><Link href={`/finance/payments/${item.id}`}>Details</Link></Button>
                  <Button asChild variant="secondary" size="sm"><Link href={`/finance/payments/${item.id}`}>Issue</Link></Button>
                </div>
              </div>
            ))}
            {paymentQueue.length === 0 && (
              <div className="rounded-xl border border-border/50 bg-card p-6 text-center text-muted-foreground text-sm shadow-sm">
                {search !== "" ? "No payments found matching your search." : "No payments pending."}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-semibold text-muted-foreground">
                Compliance & Risk
                <ShieldCheck className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>2-factor required for payouts</span>
                <Badge variant="secondary" className="rounded-full">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>High-risk holds</span>
                <Badge variant="destructive" className="rounded-full">0</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Same-day cutoff</span>
                <Badge variant="outline" className="rounded-full">5:00 PM</Badge>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full gap-2 mt-2">
                <Link href="/finance/settings">
                  <ShieldCheck className="h-4 w-4" />
                  View Controls
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                Released Today
                <Badge variant="secondary" className="rounded-full">{completedQueue.length < 10 ? completedQueue.length : "10+"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {completedQueue.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{item.accountHolderName}</span>
                    <span className="text-xs text-muted-foreground">{item.id}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{formatCurrencyIDR(item.amount)}</p>
                    <p className="text-[11px] text-muted-foreground">{getRelativeTime(item.submittedAt)}</p>
                  </div>
                </div>
              ))}
              <Link href="/finance/dashboard" className="flex items-center gap-1 text-sm font-semibold text-primary mt-2 group">
                <span className="group-hover:underline">View activity log</span> <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
