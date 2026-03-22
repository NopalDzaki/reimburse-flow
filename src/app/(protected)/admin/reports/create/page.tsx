"use client";

import { SharedReportCreate } from "@/components/shared/report-create";

export default function AdminReportCreatePage() {
  return <SharedReportCreate role="admin" backHref="/admin/reports" />;
}
