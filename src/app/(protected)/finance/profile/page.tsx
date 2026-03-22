"use client"

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Banknote, Shield, Mail, Building2, CreditCard, CheckCircle2 } from "lucide-react"

export default function FinanceProfilePage() {
	return (
		<div className="max-w-4xl space-y-6">
			<PageHeader
				title="Finance Profile"
				description="Payment authority, treasury preferences, and payout identity."
				actions={<Badge variant="secondary" className="rounded-full">Payout Authority</Badge>}
			/>

			<Card className="border border-border/60 shadow-sm">
				<CardHeader className="pb-4">
					<CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">FN</div>
						<div>
							<p className="text-lg font-semibold text-foreground">Franklin Nguyen</p>
							<p className="text-sm text-muted-foreground">Finance • Treasury Ops</p>
						</div>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<Mail className="h-4 w-4" /> franklin.nguyen@company.com
					</div>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<Building2 className="h-4 w-4" /> Finance • Full-time
					</div>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<Shield className="h-4 w-4 text-success" /> Dual control required over $10k
					</div>
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<CreditCard className="h-4 w-4 text-primary" /> Default disburser: Citi Treasury
					</div>
				</CardContent>
			</Card>

			<Card className="border border-border/60 shadow-sm">
				<CardHeader className="pb-3">
					<CardTitle className="text-base font-semibold">Payment Controls</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4 sm:grid-cols-2">
					<div className="space-y-2">
						<Label>Max per payout</Label>
						<Input defaultValue="$7,500" />
						<p className="text-xs text-muted-foreground">Escalates to Controller above this cap.</p>
					</div>
					<div className="space-y-2">
						<Label>Daily velocity limit</Label>
						<Input defaultValue="$50,000" />
						<p className="text-xs text-muted-foreground">Prevents unexpected liquidity drain.</p>
					</div>
					<div className="space-y-2">
						<Label>Preferred rails</Label>
						<Input defaultValue="ACH • Same-day" />
						<p className="text-xs text-muted-foreground">Fallback to wire for urgent claims.</p>
					</div>
					<div className="space-y-2">
						<Label>Verification channel</Label>
						<Input defaultValue="SMS + Email" />
					</div>
				</CardContent>
				<div className="flex justify-end px-6 pb-4">
					<Button variant="default" className="gap-2">
						<Banknote className="h-4 w-4" /> Update payout policy
					</Button>
				</div>
			</Card>
		</div>
	)
}
