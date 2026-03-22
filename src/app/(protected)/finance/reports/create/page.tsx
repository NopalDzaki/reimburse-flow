"use client"

import { SharedReportCreate } from "@/components/shared/report-create"

export default function FinanceReportCreatePage() {
  return <SharedReportCreate role="finance" backHref="/finance/reports" />
}
