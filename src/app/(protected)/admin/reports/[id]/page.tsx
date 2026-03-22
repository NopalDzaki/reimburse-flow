"use client"

import { useParams } from "next/navigation"
import { SharedReportDetail } from "@/components/shared/report-detail"

export default function AdminReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  return <SharedReportDetail id={id} role="admin" backHref="/admin/reports" />
}
