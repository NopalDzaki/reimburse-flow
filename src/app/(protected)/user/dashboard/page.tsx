"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Eye,
  Clock3,
  Download,
  Send,
  AlertTriangle,
  Plus,
  FileClock,
  HandHelping,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useReimbursements } from "@/context/reimbursement-context";
import { useReports } from "@/context/report-context";
import { useActivity } from "@/context/activity-context";
import { MetricChartCard } from "@/components/shared/metric-chart-card";
import { TimelineStatus } from "@/components/shared/timeline-status";
import { ActivityFeed } from "@/components/shared/activity-feed";
import { Card, CardContent } from "@/components/ui/card";
import {
  exportToCSV,
  formatCurrencyIDR,
  formatDateID,
  getRelativeTime,
} from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

const progressCopy = {
  submitted: "Sedang menunggu review admin.",
  approved_admin: "Sudah lolos review dan menunggu pembayaran.",
  rejected_admin: "Perlu ditinjau ulang sebelum ajukan lagi.",
  paid: "Sudah selesai dibayar.",
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { reimbursements } = useReimbursements();
  const { reports } = useReports();

  const myReimbursements = reimbursements
    .filter((r) => r.submittedBy === user?.id)
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

  const myReports = reports
    .filter((r) => r.createdBy === user?.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const activeSubmission =
    myReimbursements.find((item) => item.status !== "paid") ??
    myReimbursements[0];
  const openReports = myReports.filter(
    (item) => item.status !== "resolved",
  ).length;

  const totalMine = myReimbursements.length;
  const pendingMine = myReimbursements.filter(
    (item) => item.status === "submitted",
  ).length;
  const approvedMine = myReimbursements.filter(
    (item) => item.status === "approved_admin" || item.status === "paid",
  ).length;
  const rejectedMine = myReimbursements.filter(
    (item) => item.status === "rejected_admin",
  ).length;
  const paidMine = myReimbursements.filter(
    (item) => item.status === "paid",
  ).length;

  const totalAmountSubmitted = myReimbursements.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  const pendingAmount = myReimbursements
    .filter((r) => r.status === "submitted")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const approvedPaidAmount = myReimbursements
    .filter((r) => r.status === "approved_admin" || r.status === "paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const statusChartData = [
    { name: "Diproses", value: pendingMine },
    { name: "Disetujui", value: approvedMine - paidMine },
    { name: "Ditolak", value: rejectedMine },
    { name: "Dibayar", value: paidMine },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">
          Hello, {user?.name.split(" ")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Your reimbursements at a glance, ready for quick actions.
        </p>
      </div>

      {activeSubmission && (
        <div className="rounded-xl border border-border/50 bg-primary/5 p-6 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <div className="flex flex-wrap items-start justify-between gap-4 relative z-10">
            <div className="max-w-xl">
              <Badge
                variant="secondary"
                className="mb-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                Active Priority
              </Badge>
              <h2 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
                {activeSubmission.title}
              </h2>
              <p className="mt-2 text-sm text-foreground/80 md:text-base leading-relaxed">
                {progressCopy[activeSubmission.status]}
              </p>
            </div>
            <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-xl min-w-[240px] p-5 shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                Current Status
              </p>
              <div className="flex items-center justify-between gap-3 mb-4">
                <StatusBadge status={activeSubmission.status} />
                <span className="text-xs font-medium text-muted-foreground">
                  {getRelativeTime(activeSubmission.submittedAt)}
                </span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrencyIDR(activeSubmission.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-foreground">
                    {formatDateID(activeSubmission.transactionDate)}
                  </span>
                </div>
              </div>
              <Button variant="secondary" className="w-full mt-4" asChild>
                <Link href={`/user/history/${activeSubmission.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Total Submitted
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {formatCurrencyIDR(totalAmountSubmitted)}
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {totalMine} items
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Pending Review
          </p>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-heading font-bold text-warning">
              {formatCurrencyIDR(pendingAmount)}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-warning"></span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {pendingMine} pending claims
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Approved & Paid
          </p>
          <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-heading font-bold text-success">
              {formatCurrencyIDR(approvedPaidAmount)}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex h-2 w-2 rounded-full bg-success"></span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {approvedMine} successful claims
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-card hover:bg-muted/50 border-border/50"
          asChild
        >
          <Link href="/user/submit">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-1">
              <Plus className="h-5 w-5" />
            </span>
            <span className="font-semibold text-foreground">
              Submit a claim
            </span>
            <span className="text-xs text-muted-foreground font-normal text-center">
              Start a new reimbursement
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-card hover:bg-muted/50 border-border/50"
          asChild
        >
          <Link href="/user/history">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-info/10 text-info mb-1">
              <FileClock className="h-5 w-5" />
            </span>
            <span className="font-semibold text-foreground">View history</span>
            <span className="text-xs text-muted-foreground font-normal text-center">
              Track your past claims
            </span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-card hover:bg-muted/50 border-border/50"
          asChild
        >
          <Link href="/user/reports">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 text-warning mb-1">
              <HandHelping className="h-5 w-5" />
            </span>
            <span className="font-semibold text-foreground">Help center</span>
            <span className="text-xs text-muted-foreground font-normal text-center">
              Resolve any issues
            </span>
          </Link>
        </Button>
      </div>

      {/* Two Column Layout for Recent Activity */}
      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4 space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-semibold">
                Recent Claims
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    exportToCSV(
                      myReimbursements.map((r) => ({
                        ID: r.id,
                        Title: r.title,
                        Category: r.category,
                        Amount: r.amount,
                        Status: r.status,
                        TransactionDate: r.transactionDate,
                        SubmittedAt: r.submittedAt,
                      })),
                      "my_claims.csv",
                    );
                    toast.success("Claims exported to CSV");
                  }}
                >
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/user/history">View all</Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:block rounded-lg border border-border/50 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Claim</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {myReimbursements.slice(0, 3).map((claim) => (
                    <tr
                      key={claim.id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-foreground line-clamp-1">
                          {claim.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {claim.id}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground capitalize">
                        {claim.category}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatDateID(claim.transactionDate)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-foreground">
                        {formatCurrencyIDR(claim.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={claim.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          asChild
                        >
                          <Link href={`/user/history/${claim.id}`}>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 md:hidden">
              {myReimbursements.slice(0, 3).map((claim) => (
                <div
                  key={claim.id}
                  className="rounded-lg border border-border/50 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {claim.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {claim.id} • {claim.category}
                      </p>
                    </div>
                    <StatusBadge status={claim.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">
                      {formatDateID(claim.transactionDate)}
                    </span>
                    <span className="text-lg font-heading font-semibold">
                      {formatCurrencyIDR(claim.amount)}
                    </span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full gap-2"
                    asChild
                  >
                    <Link href={`/user/history/${claim.id}`}>
                      <Eye className="h-4 w-4" /> View Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {myReimbursements.length === 0 && (
              <EmptyState
                title="No reimbursements yet"
                description="Submit your first claim to see it here."
                action={
                  <Button asChild>
                    <Link href="/user/submit">Submit a claim</Link>
                  </Button>
                }
              />
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {activeSubmission?.history && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-heading font-semibold mb-4 text-foreground">
                    Latest Progress
                  </h3>
                  <TimelineStatus history={activeSubmission.history} />
                </CardContent>
              </Card>
            )}
            <MetricChartCard
              title="Status Distribution"
              data={statusChartData}
            />
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {(rejectedMine > 0 || openReports > 0) && (
            <div className="space-y-3">
              {rejectedMine > 0 && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-destructive text-sm">
                      {rejectedMine} claims rejected
                    </p>
                    <p className="text-xs text-destructive/80 mt-1 leading-relaxed">
                      Check reviewer notes in your history and resubmit if
                      necessary.
                    </p>
                  </div>
                </div>
              )}
              {openReports > 0 && (
                <div className="rounded-xl border border-info/20 bg-info/10 p-4 flex gap-3 items-start">
                  <HandHelping className="h-5 w-5 text-info shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-info text-sm">
                      {openReports} active tickets
                    </p>
                    <p className="text-xs text-info/80 mt-1 leading-relaxed">
                      Your help center tickets are currently being reviewed by
                      admin.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <ActivityFeed
            activities={useActivity().activities.filter(
              (a) =>
                a.actorName === user?.name ||
                a.title === "Disetujui admin" ||
                a.type === "payment" ||
                a.type === "report_response",
            )}
            maxItems={5}
          />
        </div>
      </div>
    </div>
  );
}
