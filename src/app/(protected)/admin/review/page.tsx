"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Filter, Search, CheckCircle, XCircle } from "lucide-react";
import { useReimbursements } from "@/context/reimbursement-context";
import { formatCurrencyIDR, formatDateID } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminReviewPage() {
  const { reimbursements } = useReimbursements();
  const [search, setSearch] = React.useState("");

  const pendingClaims = reimbursements
    .filter((r) => r.status === "submitted")
    .filter(
      (r) =>
        search === "" ||
        (r.accountHolderName &&
          r.accountHolderName.toLowerCase().includes(search.toLowerCase())) ||
        r.id.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Review Queue"
        description="Pending claims awaiting your approval decision."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" disabled>
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="default" size="sm" disabled>
              Batch Review
            </Button>
          </div>
        }
      />

      <div className="flex gap-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by name or claim ID…"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground">
            Action Required{" "}
            <span className="ml-2 px-2 py-0.5 text-xs bg-destructive/10 text-destructive rounded-sm font-semibold">
              {pendingClaims.length} Claims
            </span>
          </h3>
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
            {pendingClaims.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-muted/20 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">
                      {c.accountHolderName?.[0] || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {c.accountHolderName || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-sm font-medium uppercase tracking-wider">
                    {c.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {formatDateID(c.submittedAt)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-foreground">
                  {formatCurrencyIDR(c.amount)}
                </td>
                <td className="px-6 py-4">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary"
                  >
                    <Link href={`/admin/review/${c.id}`}>View Receipt</Link>
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      asChild
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <Link href={`/admin/review/${c.id}`}>
                        <CheckCircle className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {pendingClaims.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {search !== ""
                    ? "No claims found matching your search."
                    : "No claims pending review."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="grid gap-3 md:hidden">
        {pendingClaims.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold">
                  {c.accountHolderName?.[0] || "U"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {c.accountHolderName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">{c.id}</p>
                </div>
              </div>
              <span className="text-lg font-heading font-bold text-foreground">
                {formatCurrencyIDR(c.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-muted rounded-sm uppercase tracking-wider">
                {c.category}
              </span>
              <span>{formatDateID(c.submittedAt)}</span>
            </div>
            <div className="flex gap-2 pt-1 border-t border-border/30">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-primary border-primary/30 hover:bg-primary/10"
              >
                <Link href={`/admin/review/${c.id}`}>Review</Link>
              </Button>
            </div>
          </div>
        ))}
        {pendingClaims.length === 0 && (
          <div className="rounded-xl border border-border/50 bg-card p-6 text-center text-muted-foreground text-sm shadow-sm">
            {search !== ""
              ? "No claims found matching your search."
              : "No claims pending review."}
          </div>
        )}
      </div>
    </div>
  );
}
