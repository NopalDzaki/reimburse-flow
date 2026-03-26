import { format, formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  type Priority,
  type ReimbursementStatus,
  type ReportStatus,
  type UserRole,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateID(date: string | number | Date) {
  return format(new Date(date), "d MMM yyyy", { locale: localeID });
}

export function getRelativeTime(date: string | number | Date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: localeID,
  });
}

export function getStatusBadgeVariant(status: ReimbursementStatus) {
  switch (status) {
    case "submitted":
      return "warning";
    case "approved_admin":
      return "success";
    case "rejected_admin":
      return "destructive";
    case "paid":
      return "primary";
    default:
      return "secondary";
  }
}

export function getReportStatusVariant(status: ReportStatus) {
  switch (status) {
    case "open":
      return "warning";
    case "in_review":
      return "info";
    case "resolved":
      return "success";
    default:
      return "secondary";
  }
}

export function getPriorityVariant(priority: Priority) {
  switch (priority) {
    case "low":
      return "secondary";
    case "medium":
      return "info";
    case "high":
      return "destructive";
    default:
      return "secondary";
  }
}

export const roleLabels: Record<UserRole, string> = {
  user: "User",
  admin: "Admin",
  finance: "Finance",
  superadmin: "Superadmin",
};

export const reportCategoryLabels = {
  error: "Error Sistem",
  pertanyaan: "Pertanyaan",
  bug_ui: "Bug UI",
  akses_akun: "Akses Akun",
  permintaan_fitur: "Permintaan Fitur",
  lainnya: "Lainnya",
};

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
) {
  if (!data || !data.length) return;
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) =>
        typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val,
      )
      .join(","),
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
