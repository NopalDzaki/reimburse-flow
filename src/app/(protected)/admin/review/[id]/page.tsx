"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useReimbursements } from "@/context/reimbursement-context";
import { useActivity } from "@/context/activity-context";
import { useNotifications } from "@/context/notification-context";
import { ReimbursementDetail } from "@/components/shared/reimbursement-detail";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export default function AdminReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, approveReimbursement, rejectReimbursement } =
    useReimbursements();
  const { addActivity } = useActivity();
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const router = useRouter();

  const [isApproving, setIsApproving] = useState(false);

  const reimbursement = getById(id);

  if (!id || !reimbursement) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/admin/review">
            <ChevronLeft className="h-4 w-4" /> Back to Review Queue
          </Link>
        </Button>
        <EmptyState
          title="Claim Not Found"
          description="The reimbursement you are looking for does not exist."
        />
      </div>
    );
  }

  const handleApprove = () => {
    approveReimbursement(
      id,
      user?.name ?? "Admin",
      "Disetujui admin (Auto-note)",
    );
    addActivity({
      type: "approval",
      title: "Disetujui admin",
      description: `${user?.name} menyetujui pengajuan ${reimbursement.title}`,
      actorName: user?.name,
      relatedEntityId: id,
      entityType: "reimbursement",
    });
    addNotification({
      type: "success",
      title: "Claim Approved",
      message: `${id} has been approved successfully.`,
    });
    toast.success(`Claim ${id} approved successfully`);
    router.push("/admin/dashboard");
  };

  const handleReject = () => {
    const reason = window.prompt("Enter reason for rejection:");
    if (reason === null) return;
    if (reason.trim() === "") {
      toast.error("Rejection reason is required");
      return;
    }

    rejectReimbursement(
      id,
      user?.name ?? "Admin",
      reason
    );
    addActivity({
      type: "rejection",
      title: "Ditolak admin",
      description: `${user?.name} menolak pengajuan ${reimbursement.title} dengan alasan: ${reason}`,
      actorName: user?.name,
      relatedEntityId: id,
      entityType: "reimbursement",
    });
    addNotification({
      type: "error",
      title: "Claim Rejected",
      message: `${id} has been rejected.`,
    });
    toast.error(`Claim ${id} rejected`);
    router.push("/admin/dashboard");
  };

  const actions =
    reimbursement.status === "submitted" ? (
      <div className="flex w-full justify-between items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
          onClick={handleReject}
        >
          <XCircle className="h-4 w-4 mr-2" /> Reject Claim
        </Button>
        <Button variant="secondary" onClick={handleApprove} className="px-8">
          <CheckCircle2 className="h-4 w-4 mr-2" /> Approve Claim
        </Button>
      </div>
    ) : undefined;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <Link href="/admin/dashboard">
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
      <PageHeader
        title="Review Decision"
        description={`Perform due diligence on claim ${reimbursement.id}.`}
      />
      <ReimbursementDetail reimbursement={reimbursement} actions={actions} />
    </div>
  );
}
