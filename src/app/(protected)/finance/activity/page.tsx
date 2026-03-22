import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Activity, Filter, Download } from "lucide-react"

const PAYMENTS_LOG = [
  { id: "TXN-90210", user: "Alex Sterling", category: "Travel & Lodging", amount: "$1,240.00", date: "Jun 12, 2023", status: "paid" as const, bank: "Chase •••• 9012" },
  { id: "TXN-88421", user: "Morgan Lane", category: "Client Dinner", amount: "$432.50", date: "Jun 12, 2023", status: "paid" as const, bank: "BofA •••• 4421" },
  { id: "TXN-77612", user: "Jordan Wells", category: "SaaS Subs", amount: "$2,100.00", date: "Jun 11, 2023", status: "paid" as const, bank: "WFargo •••• 1182" },
  { id: "TXN-68210", user: "Riley North", category: "Logistics", amount: "$890.00", date: "Jun 10, 2023", status: "paid" as const, bank: "Citi •••• 3030" },
]

export default function FinanceActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Log"
        description="History of all processed payments."
        actions={
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export CSV</Button>
        }
      />
      <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>

      {PAYMENTS_LOG.length === 0 ? (
        <EmptyState icon={<Activity className="h-7 w-7" />} title="No payment history" description="Processed payments will appear here." />
      ) : (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
              <tr>
                <th className="px-6 py-3 font-medium">Claim ID</th>
                <th className="px-6 py-3 font-medium">Recipient</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Bank Account</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {PAYMENTS_LOG.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{p.user}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.category}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{p.bank}</td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">{p.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{p.date}</td>
                  <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
