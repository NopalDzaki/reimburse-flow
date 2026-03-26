import { SharedReportDetail } from "@/components/shared/report-detail";

export default async function SuperadminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <SharedReportDetail
      id={id}
      role="superadmin"
      backHref="/superadmin/tickets"
    />
  );
}
