"use client"

import * as React from "react"
import { Filter, Download, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FinanceDashboardPage() {
  const queue = [
    { id: "TX-90210", user: "Alex Sterling", bank: "Chase Bank •••• 9012", category: "TRAVEL & LODGING", amount: "$1,240.00", date: "Approved Jun 12", initials: "AS" },
    { id: "TX-88421", user: "Morgan Lane", bank: "Bank of America •••• 4421", category: "CLIENT DINNER", amount: "$432.50", date: "Approved Jun 12", initials: "ML" },
    { id: "TX-77612", user: "Jordan Wells", bank: "Wells Fargo •••• 1182", category: "SAAS SUBS", amount: "$2,100.00", date: "Approved Jun 11", initials: "JW" },
    { id: "TX-11204", user: "Riley North", bank: "Citi Bank •••• 3030", category: "LOGISTICS", amount: "$890.00", date: "Approved Jun 10", initials: "RN" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-heading font-bold tracking-tight">Financial Pipeline</h1>
          <p className="text-muted-foreground">Monitoring liquidity and approved disbursements.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Ready for Payment</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">$12,400</h2>
            <span className="text-sm font-medium text-success">+12% vs LW</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
            <CreditCard className="h-4 w-4" /> Estimated payout: Today, 4:00 PM
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Paid This Month</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">$45,200</h2>
            <span className="text-sm font-medium text-info">Target: $60k</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 mt-3">
            <div className="bg-info h-1.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Outstanding Claims</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">18</h2>
            <span className="text-sm font-medium text-destructive">4 Urgent</span>
          </div>
          <div className="flex items-center mt-3">
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[10px] font-medium">+15</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
              Payment Queue <Badge variant="secondary" className="text-[10px]">LIVE</Badge>
            </h3>
            <span className="text-sm text-primary font-medium hover:underline cursor-pointer">View Historical Archive</span>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 font-medium">Recipient</th>
                      <th className="px-6 py-4 font-medium">Classification</th>
                      <th className="px-6 py-4 font-medium">Settlement</th>
                      <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {queue.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border font-medium text-foreground">
                              {item.initials}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground">{item.user}</span>
                              <span className="text-xs text-muted-foreground">{item.bank}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-background">{item.category}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground">{item.amount}</span>
                            <span className="text-xs text-muted-foreground">{item.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="secondary" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20">
                            Issue Payment
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-heading font-semibold">Cash Velocity</h3>
          <div className="rounded-xl border border-border/50 bg-card shadow-sm h-[320px] flex flex-col p-6">
             <div className="flex-1 rounded-md bg-muted/50 mb-4 flex items-end justify-between p-2">
                {/* Mock Chart Bars */}
                <div className="w-1/6 bg-primary/20 h-[30%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary/40 h-[50%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary/60 h-[40%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary h-[80%] rounded-t-sm"></div>
                <div className="w-1/6 bg-primary/30 h-[20%] rounded-t-sm"></div>
             </div>
             <div className="flex justify-between items-center text-xs text-muted-foreground uppercase tracking-wider font-medium mb-4">
               <span>Mon</span><span>Tue</span><span>Wed</span><span className="text-foreground">Thu</span><span>Fri</span>
             </div>
             <div className="flex justify-between items-end border-t border-border/50 pt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Liquidity Pool</span>
                  <span className="text-xl font-heading font-bold">$142.8k</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Reserved</span>
                  <span className="text-xl font-heading font-bold text-primary">$12.4k</span>
                </div>
             </div>
             <div className="mt-4">
               <Button variant="outline" className="w-full">Add Funds to Pool</Button>
             </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm flex gap-3">
             <div className="mt-0.5">
               <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">i</span>
             </div>
             <div>
               <h4 className="text-sm font-semibold mb-1">Auto-Pay Schedule</h4>
               <p className="text-xs text-muted-foreground leading-relaxed">System will automatically process 12 claims matching 'Batch A' criteria at midnight.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
