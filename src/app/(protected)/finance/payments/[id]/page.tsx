"use client";

import { useParams, useRouter } from "next/navigation";
import { useReimbursements } from "@/context/reimbursement-context";
import { useActivity } from "@/context/activity-context";
import { useNotifications } from "@/context/notification-context";
import { ReimbursementDetail } from "@/components/shared/reimbursement-detail";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function FinancePaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, markAsPaid } = useReimbursements();
  const { addActivity } = useActivity();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const router = useRouter();

  const reimbursement = getById(id);

  if (!reimbursement) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild className="-ml-4 gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/finance/payments"><ChevronLeft className="h-4 w-4" /> Back to Payments</Link>
        </Button>
        <EmptyState title="Claim Not Found" description="The reimbursement you are looking for does not exist." />
      </div>
    );
  }

  const handlePay = () => {
    markAsPaid({
      id,
      actorName: user?.name ?? "Finance",
      transferDate: new Date().toISOString(),
      note: "Pembayaran telah ditransfer",
    });
    addActivity({
      type: "payment",
      title: "Pembayaran selesai",
      description: `${user?.name} menyelesaikan pembayaran untuk ${reimbursement.title}`,
      actorName: user?.name,
      relatedEntityId: id,
      entityType: "reimbursement"
    });
    addNotification({
      type: "success",
      title: "Payment Successful",
      message: `${id} has been marked as paid.`,
    });
    toast.success(`Claim ${id} paid successfully`);
    router.push("/finance/dashboard");
  };

  const actions = reimbursement.status === "approved_admin" ? (
    <>
      <Button variant="secondary" onClick={handlePay}>
        <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Paid
      </Button>
    </>
  ) : undefined;

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild className="-ml-4 gap-2 text-muted-foreground hover:text-foreground">
        <Link href="/finance/dashboard"><ChevronLeft className="h-4 w-4" /> Back to Dashboard</Link>
      </Button>
      <PageHeader 
        title="Disbursement Detail"
        description={`Process and verify payment for ${reimbursement.id}.`}
      />
      <ReimbursementDetail reimbursement={reimbursement} actions={actions} />
    </div>
  );
}
