"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { CheckCircle2, Clock3, AlertTriangle, Filter, Eye } from "lucide-react";
import { useReimbursements } from "@/context/reimbursement-context";
import { useActivity } from "@/context/activity-context";
import { formatCurrencyIDR, getRelativeTime } from "@/lib/utils";
import { ActivityFeed } from "@/components/shared/activity-feed";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { reimbursements } = useReimbursements();
  const { activities } = useActivity();

  const pendingReimbursements = reimbursements.filter(
    (r) => r.status === "submitted",
  );
  const urgentCount = pendingReimbursements.filter(
    (r) => r.amount > 5000000,
  ).length; // Example logic for urgent

  const reviewedToday = reimbursements.filter(
    (r) =>
      (r.status === "approved_admin" || r.status === "rejected_admin") &&
      r.reviewedAt &&
      new Date(r.reviewedAt).toDateString() === new Date().toDateString(),
  ).length;

  const adminActivities = activities
    .filter(
      (a) =>
        a.type === "approval" ||
        a.type === "rejection" ||
        a.type === "reimbursement",
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">
          Review Queue
        </h1>
        <p className="text-muted-foreground">
          Monitor and process pending employee claims.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Pending Review
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {pendingReimbursements.length}
            </h2>
            {urgentCount > 0 && (
              <span className="text-sm font-medium text-destructive">
                {urgentCount} urgent
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Requires admin approval
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Reviewed Today
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">{reviewedToday}</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Completion rate today
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Active
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">
              {reimbursements.filter((r) => r.status !== "paid").length}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Claims in progress
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-heading font-semibold">
                Action Required
              </h3>
              {urgentCount > 0 && (
                <Badge variant="destructive" className="rounded-full">
                  {urgentCount} urgent
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => toast.info("Filter and batch actions are in development")} variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button onClick={() => toast.info("Auto-approve logic is in development")} variant="secondary" size="sm" className="gap-2">
                <CheckCircle2 className="h-4 w-4" /> Auto-approve safe
              </Button>
            </div>
          </div>

          {pendingReimbursements.length === 0 && (
            <EmptyState
              title="No items pending"
              description="You're caught up. We'll notify you when new claims arrive."
            />
          )}

          <div className="grid gap-3">
            {pendingReimbursements.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-border/50 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between hover:bg-muted/20 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-heading font-semibold text-foreground">
                    {item.submittedByName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.id} • {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Clock3 className="h-4 w-4" /> Waiting{" "}
                    {getRelativeTime(item.submittedAt)}
                    <StatusBadge status={item.status} />
                    <Badge
                      variant="outline"
                      className="rounded-full font-semibold"
                    >
                      {formatCurrencyIDR(item.amount)}
                    </Badge>
                    {item.amount > 5000000 && (
                      <Badge variant="destructive" className="rounded-full">
                        High Value
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/review/${item.id}`}>
                      <Eye className="h-4 w-4 mr-2" /> Review Docs
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-heading font-semibold">
            Operational Activity
          </h3>
          <ActivityFeed activities={adminActivities} maxItems={5} />
        </div>
      </div>
    </div>
  );
}
