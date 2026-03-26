"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Activity, Filter, Download } from "lucide-react";

import { useReimbursements } from "@/context/reimbursement-context";
import { formatCurrencyIDR, formatDateID, exportToCSV } from "@/lib/utils";
import { toast } from "sonner";

export default function FinanceActivityPage() {
  const { reimbursements } = useReimbursements();
  const paidClaims = reimbursements.filter(
    (r) => r.status === "paid" || r.paidAt,
  );

  const handleExport = () => {
    exportToCSV(
      paidClaims.map((r) => ({
        ClaimID: r.id,
        Recipient: r.accountHolderName,
        Category: r.category,
        BankAccount: `${r.bankName} - ${r.accountNumber}`,
        Amount: r.amount,
        Date: r.paidAt ? formatDateID(r.paidAt) : formatDateID(r.submittedAt),
        Status: r.status,
      })),
      "finance_activity.csv",
    );
    toast.success("Activity log exported to CSV");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Log"
        description="History of all processed payments."
        actions={
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Filter className="h-4 w-4" /> Filter
      </Button>

      {paidClaims.length === 0 ? (
        <EmptyState
          icon={<Activity className="h-7 w-7" />}
          title="No payment history"
          description="Processed payments will appear here."
        />
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
              {paidClaims.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {p.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {p.accountHolderName}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {p.category}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {p.bankName} •••• {p.accountNumber.slice(-4)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    {formatCurrencyIDR(p.amount)}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {p.paidAt
                      ? formatDateID(p.paidAt)
                      : formatDateID(p.submittedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
