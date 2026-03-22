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
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: localeID });
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
