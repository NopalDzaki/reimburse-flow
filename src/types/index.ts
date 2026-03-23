export type UserRole = "user" | "admin" | "finance" | "superadmin";

export type ReimbursementStatus =
  | "submitted"
  | "approved_admin"
  | "rejected_admin"
  | "paid";

export type ReportCategory =
  | "error"
  | "pertanyaan"
  | "bug_ui"
  | "akses_akun"
  | "permintaan_fitur"
  | "lainnya";

export type ReportStatus = "open" | "in_review" | "resolved";

export type Priority = "low" | "medium" | "high";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ReimbursementHistoryItem {
  status: ReimbursementStatus;
  note?: string;
  actorName?: string;
  createdAt: string;
}

export interface Reimbursement {
  id: string;
  title: string;
  description: string;
  category: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  receiptImage?: string;
  itemImage?: string;
  paymentProofImage?: string;
  submittedBy: string;
  submittedByName?: string;
  submittedAt: string;
  transactionDate: string;
  status: ReimbursementStatus;
  adminNote?: string;
  financeNote?: string;
  paidAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  paidBy?: string;
  history: ReimbursementHistoryItem[];
}

export interface ActivityLog {
  id: string;
  type: string;
  title: string;
  description: string;
  actorId?: string;
  actorName?: string;
  createdAt: string;
  relatedEntityId?: string;
  entityType?: string;
}

export interface ReportReply {
  id: string;
  body: string;
  userId: string;
  createdAt: string;
  isSystem?: boolean;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  priority: Priority;
  createdBy: string;
  createdByName?: string;
  createdAt: string;
  status: ReportStatus;
  responseNote?: string;
  attachment?: string;
  relatedReimbursementId?: string;
  replies?: ReportReply[];
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles?: UserRole[];
}
