"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Download, Clock3, ShieldCheck, ArrowRight, Smartphone } from "lucide-react"

const PAYMENT_QUEUE = [
	{ id: "TX-90210", employee: "Alex Sterling", dept: "Sales", bank: "Chase •••• 9012", amount: "$1,240.00", scheduled: "Today • 4:00 PM", status: "approved" as const, risk: "low" as const },
	{ id: "TX-88421", employee: "Morgan Lane", dept: "Marketing", bank: "Bank of America •••• 4421", amount: "$432.50", scheduled: "Today • 6:00 PM", status: "pending" as const, risk: "medium" as const },
	{ id: "TX-77612", employee: "Jordan Wells", dept: "Ops", bank: "Wells Fargo •••• 1182", amount: "$2,100.00", scheduled: "Tomorrow • 10:00 AM", status: "approved" as const, risk: "high" as const },
	{ id: "TX-11204", employee: "Riley North", dept: "Logistics", bank: "Citi •••• 3030", amount: "$890.00", scheduled: "Queued", status: "pending" as const, risk: "medium" as const },
	{ id: "TX-55214", employee: "Jamie Ortega", dept: "Product", bank: "Chase •••• 1212", amount: "$310.00", scheduled: "Queued", status: "approved" as const, risk: "low" as const },
]

const COMPLETED = [
	{ id: "TX-44210", employee: "Taylor Quinn", amount: "$1,020.00", date: "Paid yesterday" },
	{ id: "TX-33109", employee: "Sam Lee", amount: "$540.00", date: "Paid yesterday" },
]

export default function FinancePaymentsPage() {
	return (
		<div className="space-y-8">
			<PageHeader
				title="Payment Queue"
				description="Approve, schedule, and release reimbursements with audit-ready context."
				actions={
					<div className="flex gap-2">
						<Button variant="outline" size="sm" className="gap-2">
							<Filter className="h-4 w-4" />
							Filters
						</Button>
						<Button variant="secondary" size="sm" className="gap-2">
							<Download className="h-4 w-4" />
							Export CSV
						</Button>
					</div>
				}
			/>

			<div className="grid gap-6 lg:grid-cols-4">
				<div className="lg:col-span-3 space-y-4">
					<div className="flex flex-wrap items-center gap-3">
						<Badge variant="secondary" className="rounded-full">Ready: 3</Badge>
						<Badge variant="outline" className="rounded-full">Pending Docs: 2</Badge>
						<Badge variant="destructive" className="rounded-full">High Risk: 1</Badge>
						<span className="text-xs text-muted-foreground">SLA target: <strong>4h</strong> to payout</span>
					</div>

					{/* Desktop table */}
					<div className="hidden md:block rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left">
								<thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
									<tr>
										<th className="px-6 py-3 font-semibold">Recipient</th>
										<th className="px-6 py-3 font-semibold">Department</th>
										<th className="px-6 py-3 font-semibold">Bank</th>
										<th className="px-6 py-3 font-semibold">Schedule</th>
										<th className="px-6 py-3 font-semibold text-right">Amount</th>
										<th className="px-6 py-3 font-semibold">Status</th>
										<th className="px-6 py-3 font-semibold text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border/50">
									{PAYMENT_QUEUE.map((item) => (
										<tr key={item.id} className="hover:bg-muted/20 transition-colors">
											<td className="px-6 py-4">
												<div className="flex flex-col">
													<span className="font-semibold text-foreground">{item.employee}</span>
													<span className="text-xs text-muted-foreground">{item.id}</span>
												</div>
											</td>
											<td className="px-6 py-4 text-muted-foreground">{item.dept}</td>
											<td className="px-6 py-4 text-muted-foreground">{item.bank}</td>
											<td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
												<Clock3 className="h-4 w-4" />
												{item.scheduled}
											</td>
											<td className="px-6 py-4 text-right font-semibold text-foreground">{item.amount}</td>
											<td className="px-6 py-4"><StatusBadge status={item.status} /></td>
											<td className="px-6 py-4 text-right space-x-2">
												<Button variant="outline" size="sm">Details</Button>
												<Button variant="secondary" size="sm">Issue</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Mobile cards */}
					<div className="grid gap-3 md:hidden">
						{PAYMENT_QUEUE.map((item) => (
							<div key={item.id} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3">
								<div className="flex items-start justify-between gap-3">
									<div className="flex flex-col">
										<span className="text-sm text-muted-foreground">{item.id}</span>
										<p className="text-lg font-heading font-semibold text-foreground">{item.employee}</p>
										<p className="text-xs text-muted-foreground">{item.dept} • {item.bank}</p>
									</div>
									<StatusBadge status={item.status} />
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Clock3 className="h-4 w-4" />
										{item.scheduled}
									</div>
									<span className="text-xl font-heading font-bold text-foreground">{item.amount}</span>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<Button variant="outline" size="sm">Details</Button>
									<Button variant="secondary" size="sm">Issue</Button>
								</div>
							</div>
						))}
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
								<Badge variant="destructive" className="rounded-full">1</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span>Same-day cutoff</span>
								<Badge variant="outline" className="rounded-full">5:00 PM</Badge>
							</div>
							<Button variant="outline" size="sm" className="w-full gap-2">
								<ShieldCheck className="h-4 w-4" />
								View Controls
							</Button>
						</CardContent>
					</Card>

					<Card className="border border-border/60 shadow-sm">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								Released Today
								<Badge variant="secondary" className="rounded-full">2</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 text-sm text-muted-foreground">
							{COMPLETED.map((item) => (
								<div key={item.id} className="flex items-center justify-between">
									<div className="flex flex-col">
										<span className="font-medium text-foreground">{item.employee}</span>
										<span className="text-xs text-muted-foreground">{item.id}</span>
									</div>
									<div className="text-right">
										<p className="text-sm font-semibold text-foreground">{item.amount}</p>
										<p className="text-[11px] text-muted-foreground">{item.date}</p>
									</div>
								</div>
							))}
							<Link href="/finance/activity" className="flex items-center gap-1 text-sm font-semibold text-primary">
								View activity log <ArrowRight className="h-4 w-4" />
							</Link>
						</CardContent>
					</Card>

					<Card className="border border-border/60 shadow-sm">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-base font-semibold">
								Mobile Payouts
								<Badge variant="outline" className="rounded-full">Beta</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2 text-sm text-muted-foreground">
							<p>Push urgent reimbursements directly from your phone with biometric confirmation.</p>
							<Button variant="secondary" size="sm" className="w-full gap-2">
								<Smartphone className="h-4 w-4" />
								Install mobile approval
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
