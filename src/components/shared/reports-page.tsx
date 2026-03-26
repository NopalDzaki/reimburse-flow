"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Eye, Filter } from "lucide-react";
import { useReports } from "@/context/report-context";
import { useAuth } from "@/context/auth-context";
import { getRelativeTime } from "@/lib/utils";

interface SharedReportsPageProps {
  role: "admin" | "finance" | "superadmin";
}

export function SharedReportsPage({ role }: SharedReportsPageProps) {
  const { user } = useAuth();
  const { reports } = useReports();

  // admins, finance, superadmin see all or only theirs?
  // Typically they see all reports addressed to the system/superadmin, or only their own tickets.
  // We'll show their own submitted tickets unless they have an elevated view (superadmin sees all).
  const viewableReports =
    role === "superadmin"
      ? reports
      : reports.filter((r) => r.createdBy === user?.id);

  const createHref = `/${role}/reports/create`;
  const getDetailHref = (id: string) => `/${role}/reports/${id}`; // superadmin might use support, let's assume /reports for now unless overridden

  return (
    <div className="space-y-6">
      <PageHeader
        title={role === "superadmin" ? "All Support Tickets" : "My Reports"}
        description={
          role === "superadmin"
            ? "Global view of support requests."
            : "Issues and tickets you have submitted to Superadmin."
        }
        actions={
          role !== "superadmin" ? (
            <Link href={createHref}>
              <Button
                variant="gradient"
                className="gap-2 shadow-lg shadow-primary/20"
              >
                <MessageSquarePlus className="h-4 w-4" /> New Report
              </Button>
            </Link>
          ) : undefined
        }
      />
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" /> Filter by Status
        </Button>
      </div>
      {viewableReports.length === 0 ? (
        <EmptyState
          title={role === "superadmin" ? "No tickets" : "No reports yet"}
          description={
            role === "superadmin"
              ? "The support queue is empty."
              : "Submit a support ticket and it will appear here."
          }
          action={
            role !== "superadmin" ? (
              <Link href={createHref}>
                <Button>Create First Report</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-3">
          {viewableReports.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-border/50 bg-card p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    {r.id}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                    {r.category}
                  </span>
                </div>
                <p className="font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getRelativeTime(r.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={r.priority} />
                <StatusBadge status={r.status} />
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-primary hover:text-primary"
                >
                  <Link href={getDetailHref(r.id)}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
