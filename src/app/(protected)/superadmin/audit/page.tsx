"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { useActivity } from "@/context/activity-context";
import { getRelativeTime, exportToCSV } from "@/lib/utils";
import { toast } from "sonner";

const typeStyle: Record<string, { dot: string; border: string }> = {
  info: { dot: "bg-info", border: "border-info/40" },
  error: { dot: "bg-destructive", border: "border-destructive/40" },
  primary: { dot: "bg-primary", border: "border-primary/40" },
  warning: { dot: "bg-warning", border: "border-warning/40" },
  success: { dot: "bg-success", border: "border-success/40" },
};

export default function SuperadminAuditPage() {
  const { activities } = useActivity();

  const handleExport = () => {
    exportToCSV(
      activities.map((a) => ({
        ID: a.id,
        Type: a.type,
        Event: a.title,
        Detail: a.description,
        Actor: a.actorName || "System",
        Date: a.createdAt,
      })),
      "audit_trail.csv",
    );
    toast.success("Audit trail exported to CSV");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Trail"
        description="Complete chronological history of all system events."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" disabled>
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        }
      />

      <div className="relative pl-6 space-y-0">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border/50" />
        {activities.map((a, i) => {
          let styleKey = "info";
          if (a.type === "rejection") styleKey = "error";
          if (a.type === "approval" || a.type === "payment")
            styleKey = "success";
          if (a.type === "report") styleKey = "warning";
          const style = typeStyle[styleKey] ?? typeStyle.info;

          return (
            <div key={a.id || i} className="relative pb-6 last:pb-0">
              <div
                className={`absolute -left-4 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background ${style.border}`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm hover:bg-muted/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <span className="font-heading text-sm font-semibold text-foreground">
                    {a.title}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {getRelativeTime(a.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 opacity-60 capitalize">
                  Source: {a.actorName || "System"}
                </p>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-muted-foreground text-sm pt-4">
            No audit logs available.
          </p>
        )}
      </div>
    </div>
  );
}
