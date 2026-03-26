"use client";

import { useParams } from "next/navigation";
import { SharedReportDetail } from "@/components/shared/report-detail";

export default function FinanceReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <SharedReportDetail id={id} role="finance" backHref="/finance/reports" />
  );
}
