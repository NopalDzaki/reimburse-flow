"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye } from "lucide-react";
import { useReimbursements } from "@/context/reimbursement-context";
import { formatCurrencyIDR, formatDateID } from "@/lib/utils";
import { toast } from "sonner";

export default function SuperadminClaimsPage() {
  const { reimbursements } = useReimbursements();
  const [search, setSearch] = React.useState("");

  const visibleClaims = reimbursements.filter(
    (r) =>
      search === "" ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      (r.accountHolderName &&
        r.accountHolderName.toLowerCase().includes(search.toLowerCase())) ||
      (r.bankName && r.bankName.toLowerCase().includes(search.toLowerCase())) ||
      r.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Claims"
        description="Global view of every reimbursement across all roles."
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by name, ID, or bank…"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => toast.info("Filter settings coming soon")}
        >
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="px-6 py-3 font-medium">Claim ID</th>
              <th className="px-6 py-3 font-medium">Bank Target</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Submitted</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {visibleClaims.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                  {c.id}
                </td>
                <td className="px-6 py-4 font-medium text-foreground">
                  {c.bankName}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {c.category}
                </td>
                <td className="px-6 py-4 text-right font-bold text-foreground">
                  {formatCurrencyIDR(c.amount)}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs">
                  {formatDateID(c.submittedAt)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary hover:text-primary"
                  >
                    <Link href={`/superadmin/claims/${c.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {visibleClaims.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {search !== ""
                    ? "No claims found matching your search."
                    : "No claims present in the system."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
