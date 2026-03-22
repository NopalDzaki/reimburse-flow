"use client";

import { useParams } from "next/navigation";
import { useReimbursements } from "@/context/reimbursement-context";
import { ReimbursementDetail } from "@/components/shared/reimbursement-detail";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SuperadminClaimDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useReimbursements();
  
  const reimbursement = getById(id);

  if (!reimbursement) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild className="-ml-4 gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/superadmin/dashboard"><ChevronLeft className="h-4 w-4" /> Back to Claims</Link>
        </Button>
        <EmptyState title="Claim Not Found" description="The reimbursement you are looking for does not exist." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild className="-ml-4 gap-2 text-muted-foreground hover:text-foreground">
        <Link href="/superadmin/dashboard"><ChevronLeft className="h-4 w-4" /> Back to Dashboard</Link>
      </Button>
      <PageHeader 
        title="Audit Claim View"
        description={`Superadmin read-only access for ${reimbursement.id}.`}
      />
      <ReimbursementDetail reimbursement={reimbursement} />
    </div>
  );
}
