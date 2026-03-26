"use client";

import { useParams, useRouter } from "next/navigation";
import { useReimbursements } from "@/context/reimbursement-context";
import { ReimbursementDetail } from "@/components/shared/reimbursement-detail";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function UserReimbursementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useReimbursements();
  const { user } = useAuth();

  const reimbursement = getById(id);

  if (!reimbursement || reimbursement.submittedBy !== user?.id) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/user/history">
            <ChevronLeft className="h-4 w-4" /> Back to History
          </Link>
        </Button>
        <EmptyState
          title="Claim Not Found"
          description="The reimbursement you are looking for does not exist or you don't have access."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <Link href="/user/history">
          <ChevronLeft className="h-4 w-4" /> Back to History
        </Link>
      </Button>
      <PageHeader
        title="Claim Details"
        description={`View details, progress, and attachments for ${reimbursement.id}.`}
      />
      <ReimbursementDetail reimbursement={reimbursement} />
    </div>
  );
}
