"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Filter, Search, Eye } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useReimbursements } from "@/context/reimbursement-context";
import { formatCurrencyIDR, formatDateID } from "@/lib/utils";
import { toast } from "sonner";

export default function UserHistoryPage() {
  const { user } = useAuth();
  const { reimbursements } = useReimbursements();
  const [search, setSearch] = React.useState("");

  const userClaims = reimbursements
    .filter((r) => r.submittedBy === user?.id)
    .filter(
      (r) =>
        search === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Claim History"
        description="All reimbursement requests you have submitted."
        actions={
          <Link href="/user/submit">
            <Button
              variant="gradient"
              className="gap-2 shadow-lg shadow-primary/20"
            >
              + New Claim
            </Button>
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search claims…"
            className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => toast.info("Advanced status filters coming soon")}
        >
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-border/50">
            <tr className="text-xs uppercase text-muted-foreground bg-muted/40">
              <th className="px-6 py-3 font-medium">ID / Title</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium text-right">Amount</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {userClaims.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.id}</p>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {c.category}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {formatDateID(c.submittedAt)}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-foreground">
                  {formatCurrencyIDR(c.amount)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary hover:text-primary"
                  >
                    <Link href={`/user/history/${c.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
            {userClaims.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  {search !== ""
                    ? "No claims found matching your search."
                    : "You have not submitted any claims yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="grid gap-3 md:hidden">
        {userClaims.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-border/50 bg-card p-4 shadow-sm flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {c.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {c.id} • {c.category}
                </p>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-heading font-bold text-foreground">
                {formatCurrencyIDR(c.amount)}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDateID(c.submittedAt)}
              </span>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full gap-2 text-primary border-primary/30 hover:bg-primary/10"
            >
              <Link href={`/user/history/${c.id}`}>
                <Eye className="h-4 w-4" /> View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
