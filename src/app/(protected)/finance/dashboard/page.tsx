"use client";

import * as React from "react";
import { Filter, Download, CreditCard, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useReimbursements } from "@/context/reimbursement-context";
import { formatCurrencyIDR, formatDateID, getRelativeTime } from "@/lib/utils";
import { MetricChartCard } from "@/components/shared/metric-chart-card";
import Link from "next/link";
import { toast } from "sonner";

export default function FinanceDashboardPage() {
  const { reimbursements } = useReimbursements();
  const queue = reimbursements.filter((r) => r.status === "approved_admin");
  const paid = reimbursements.filter((r) => r.status === "paid");

  const readyAmount = queue.reduce((acc, curr) => acc + curr.amount, 0);
  const paidAmount = paid.reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingAmount = reimbursements
    .filter((r) => r.status !== "paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Chart data Mock
  const cashVelocityData = [
    { name: "Mon", value: 12000000 },
    { name: "Tue", value: 45000000 },
    { name: "Wed", value: 21000000 },
    { name: "Thu", value: 65000000 },
    { name: "Fri", value: 5000000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-heading font-bold tracking-tight">
            Financial Pipeline
          </h1>
          <p className="text-muted-foreground">
            Monitoring liquidity and approved disbursements.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => toast.info("Filter functionality is in development")} variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => toast.info("Export functionality is in development")} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Ready for Payment
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {formatCurrencyIDR(readyAmount)}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
            <CreditCard className="h-4 w-4" /> {queue.length} approved claims
            ready
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Paid This Month
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {formatCurrencyIDR(paidAmount)}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {paid.length} claims settled
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Total Outstanding
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {formatCurrencyIDR(outstandingAmount)}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Across all pending stages
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
              Payment Queue{" "}
              <Badge variant="secondary" className="text-[10px]">
                LIVE
              </Badge>
            </h3>
            <Link
              href="/finance/payments"
              className="text-sm text-primary font-medium hover:underline cursor-pointer"
            >
              View All Setup
            </Link>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4 font-medium">Recipient</th>
                      <th className="px-6 py-4 font-medium">Details</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {queue.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-8 text-center text-muted-foreground"
                        >
                          Queue is empty
                        </td>
                      </tr>
                    )}
                    {queue.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border font-medium text-foreground">
                              {item.submittedByName?.[0] ?? "U"}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-foreground">
                                {item.submittedByName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.bankName} ••••{" "}
                                {item.accountNumber.slice(-4)}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground">
                              {formatCurrencyIDR(item.amount)}
                            </span>
                            <span className="text-xs text-success bg-success/10 px-1 inline-flex rounded mt-1 w-fit">
                              Approved{" "}
                              {getRelativeTime(
                                item.reviewedAt || item.submittedAt,
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                            asChild
                          >
                            <Link href={`/finance/payments/${item.id}`}>
                              <Eye className="w-4 h-4 mr-2" /> Detail
                            </Link>
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

        <div className="md:col-span-3 space-y-6">
          <MetricChartCard
            title="Estimated Cash Velocity"
            data={cashVelocityData}
          />

          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm flex gap-3">
            <div className="mt-0.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                i
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">
                Batch Processing Active
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                System will automatically bundle verified payouts that share the
                same destination bank at 15:00 WIB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
