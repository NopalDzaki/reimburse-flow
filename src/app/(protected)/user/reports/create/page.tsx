"use client"

import { SharedReportCreate } from "@/components/shared/report-create"

export default function UserReportCreatePage() {
  return <SharedReportCreate role="user" backHref="/user/reports" />
}
