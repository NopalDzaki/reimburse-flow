"use client";

import { useParams } from "next/navigation";
import { SharedReportDetail } from "@/components/shared/report-detail";

export default function UserReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <SharedReportDetail id={id} role="user" backHref="/user/reports" />;
}
