"use client";

import { createContext, useContext } from "react";
import { mockReimbursements } from "@/data/mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type {
  Reimbursement,
  ReimbursementHistoryItem,
  ReimbursementStatus,
} from "@/types";

type CreateReimbursementInput = Omit<
  Reimbursement,
  | "id"
  | "submittedAt"
  | "status"
  | "history"
  | "adminNote"
  | "financeNote"
  | "paidAt"
  | "reviewedAt"
  | "reviewedBy"
  | "paidBy"
> & {
  status?: ReimbursementStatus;
  adminNote?: string;
  financeNote?: string;
  paidAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  paidBy?: string;
};

interface ReimbursementContextValue {
  reimbursements: Reimbursement[];
  createReimbursement: (data: CreateReimbursementInput) => Reimbursement;
  updateReimbursement: (id: string, updates: Partial<Reimbursement>) => void;
  addHistory: (id: string, item: ReimbursementHistoryItem) => void;
  approveReimbursement: (id: string, actorName: string, note?: string) => void;
  rejectReimbursement: (id: string, actorName: string, reason: string) => void;
  markAsPaid: (params: {
    id: string;
    actorName: string;
    transferDate: string;
    note?: string;
    paymentProofImage?: string;
  }) => void;
  getById: (id: string) => Reimbursement | undefined;
}

const ReimbursementContext = createContext<
  ReimbursementContextValue | undefined
>(undefined);

export function ReimbursementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reimbursements, setReimbursements] = useLocalStorage<Reimbursement[]>(
    "reimburse-reimbursements",
    mockReimbursements,
  );

  const createReimbursement: ReimbursementContextValue["createReimbursement"] =
    (data) => {
      const nextId = `RMB-${(reimbursements.length + 1).toString().padStart(4, "0")}`;
      const submittedAt = new Date().toISOString();
      const status: ReimbursementStatus = data.status ?? "submitted";
      const history: ReimbursementHistoryItem[] = [
        { status, createdAt: submittedAt, actorName: data.submittedByName },
      ];

      const payload: Reimbursement = {
        id: nextId,
        submittedAt,
        status,
        history,
        ...data,
      };

      setReimbursements((prev) => [payload, ...prev]);
      return payload;
    };

  const updateReimbursement: ReimbursementContextValue["updateReimbursement"] =
    (id, updates) => {
      setReimbursements((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      );
    };

  const addHistory: ReimbursementContextValue["addHistory"] = (id, item) => {
    setReimbursements((prev) =>
      prev.map((reimburse) =>
        reimburse.id === id
          ? {
              ...reimburse,
              history: [...reimburse.history, item],
              status: item.status,
            }
          : reimburse,
      ),
    );
  };

  const approveReimbursement: ReimbursementContextValue["approveReimbursement"] =
    (id, actorName, note) => {
      const reviewedAt = new Date().toISOString();
      setReimbursements((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            status: "approved_admin",
            adminNote: note,
            reviewedAt,
            reviewedBy: actorName,
            history: [
              ...item.history,
              {
                status: "approved_admin",
                note,
                actorName,
                createdAt: reviewedAt,
              },
            ],
          };
        }),
      );
    };

  const rejectReimbursement: ReimbursementContextValue["rejectReimbursement"] =
    (id, actorName, reason) => {
      const reviewedAt = new Date().toISOString();
      setReimbursements((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            status: "rejected_admin",
            adminNote: reason,
            reviewedAt,
            reviewedBy: actorName,
            history: [
              ...item.history,
              {
                status: "rejected_admin",
                note: reason,
                actorName,
                createdAt: reviewedAt,
              },
            ],
          };
        }),
      );
    };

  const markAsPaid: ReimbursementContextValue["markAsPaid"] = ({
    id,
    actorName,
    transferDate,
    note,
    paymentProofImage,
  }) => {
    const paidAt = transferDate
      ? new Date(transferDate).toISOString()
      : new Date().toISOString();
    setReimbursements((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          status: "paid",
          financeNote: note,
          paymentProofImage,
          paidAt,
          paidBy: actorName,
          history: [
            ...item.history,
            {
              status: "paid",
              note,
              actorName,
              createdAt: paidAt,
            },
          ],
        };
      }),
    );
  };

  const getById: ReimbursementContextValue["getById"] = (id) =>
    reimbursements.find((r) => r.id === id);

  const value: ReimbursementContextValue = {
    reimbursements,
    createReimbursement,
    updateReimbursement,
    addHistory,
    approveReimbursement,
    rejectReimbursement,
    markAsPaid,
    getById,
  };

  return (
    <ReimbursementContext.Provider value={value}>
      {children}
    </ReimbursementContext.Provider>
  );
}

export function useReimbursements() {
  const ctx = useContext(ReimbursementContext);
  if (!ctx)
    throw new Error("useReimbursements harus di dalam ReimbursementProvider");
  return ctx;
}
