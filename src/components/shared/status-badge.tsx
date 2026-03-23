import * as React from "react"
import { cn } from "@/lib/utils"

type StatusType =
  | "submitted" | "pending" | "approved" | "rejected" | "paid"
  | "approved_admin" | "rejected_admin"
  | "open" | "in-progress" | "resolved" | "closed" | "in_review" | "urgent" | "high" | "medium" | "low"

const statusMap: Record<StatusType, { label: string; dot: string; bg: string; text: string }> = {
  submitted:   { label: "Submitted",   dot: "bg-warning", bg: "bg-warning/10", text: "text-warning" },
  pending:     { label: "Pending",     dot: "bg-warning",         bg: "bg-warning/10", text: "text-warning" },
  approved:    { label: "Approved",    dot: "bg-success",         bg: "bg-success/10", text: "text-success" },
  approved_admin: { label: "Disetujui Admin", dot: "bg-success", bg: "bg-success/10", text: "text-success" },
  rejected:    { label: "Rejected",    dot: "bg-destructive",     bg: "bg-destructive/10", text: "text-destructive" },
  rejected_admin: { label: "Ditolak Admin", dot: "bg-destructive", bg: "bg-destructive/10", text: "text-destructive" },
  paid:        { label: "Dibayar",     dot: "bg-primary",         bg: "bg-primary/10", text: "text-primary" },
  open:        { label: "Open",        dot: "bg-info",            bg: "bg-info/10", text: "text-info" },
  in_review:   { label: "In Review",   dot: "bg-info",            bg: "bg-info/10", text: "text-info" },
  "in-progress": { label: "In Progress", dot: "bg-warning",      bg: "bg-warning/10", text: "text-warning" },
  resolved:    { label: "Resolved",    dot: "bg-success",         bg: "bg-success/10", text: "text-success" },
  closed:      { label: "Closed",      dot: "bg-muted-foreground", bg: "bg-muted/60", text: "text-muted-foreground" },
  urgent:      { label: "Urgent",      dot: "bg-destructive",     bg: "bg-destructive/10", text: "text-destructive" },
  high:        { label: "High",        dot: "bg-destructive",     bg: "bg-destructive/10", text: "text-destructive" },
  medium:      { label: "Medium",      dot: "bg-warning",         bg: "bg-warning/10", text: "text-warning" },
  low:         { label: "Low",         dot: "bg-success",         bg: "bg-success/10", text: "text-success" },
}

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const cfg = statusMap[status] ?? statusMap.submitted
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold", cfg.bg, cfg.text, className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
      {cfg.label}
    </span>
  )
}
