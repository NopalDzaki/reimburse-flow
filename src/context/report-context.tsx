"use client";

import { createContext, useContext } from "react";
import { mockReports } from "@/data/mock-data";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { Report, ReportStatus } from "@/types";

type CreateReportInput = Omit<Report, "id" | "createdAt" | "status"> & { status?: ReportStatus };

interface ReportContextValue {
  reports: Report[];
  createReport: (data: CreateReportInput) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  getById: (id: string) => Report | undefined;
  addReply: (id: string, body: string, userId: string) => void;
}

const ReportContext = createContext<ReportContextValue | undefined>(undefined);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useLocalStorage<Report[]>("reimburse-reports", mockReports);

  const createReport: ReportContextValue["createReport"] = (data) => {
    const nextId = `RP-${(reports.length + 1).toString().padStart(3, "0")}`;
    const createdAt = new Date().toISOString();
    const payload: Report = {
      id: nextId,
      createdAt,
      status: data.status ?? "open",
      ...data,
    };
    setReports((prev) => [payload, ...prev]);
  };

  const updateReport: ReportContextValue["updateReport"] = (id, updates) => {
    setReports((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const getById: ReportContextValue["getById"] = (id) => reports.find((r) => r.id === id);

  const addReply: ReportContextValue["addReply"] = (id, body, userId) => {
    setReports((prev) => prev.map((item) => {
      if (item.id === id) {
        const newReply = {
          id: `MSG-${Date.now()}`,
          body,
          userId,
          createdAt: new Date().toISOString()
        };
        return {
          ...item,
          replies: [...(item.replies || []), newReply],
          status: "resolved", // Assuming superadmin reply resolves the generic ticket for now
          responseNote: body
        };
      }
      return item;
    }));
  };

  const value: ReportContextValue = { reports, createReport, updateReport, getById, addReply };

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
}

export function useReports() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReports harus di dalam ReportProvider");
  return ctx;
}
