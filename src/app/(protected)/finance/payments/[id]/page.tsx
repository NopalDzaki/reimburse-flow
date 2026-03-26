"use client";

import { useParams, useRouter } from "next/navigation";
import * as React from "react";
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

  const [note, setNote] = React.useState("");
  const [proofFile, setProofFile] = React.useState<File | null>(null);
  const [proofPreview, setProofPreview] = React.useState<string | null>(null);

  const reimbursement = getById(id);

  if (!id || !reimbursement) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/finance/payments">
            <ChevronLeft className="h-4 w-4" /> Back to Payments
          </Link>
        </Button>
        <EmptyState
          title="Claim Not Found"
          description="The reimbursement you are looking for does not exist."
        />
      </div>
    );
  }

  const handlePay = () => {
    markAsPaid({
      id,
      actorName: user?.name ?? "Finance",
      transferDate: new Date().toISOString(),
      note: note.trim() || "Pembayaran telah ditransfer",
      paymentProofImage: proofPreview || undefined,
    });
    addActivity({
      type: "payment",
      title: "Pembayaran selesai",
      description: `${user?.name} menyelesaikan pembayaran untuk ${reimbursement.title}${note ? ` dengan catatan: ${note}` : ""}`,
      actorName: user?.name,
      relatedEntityId: id,
      entityType: "reimbursement",
    });
    addNotification({
      type: "success",
      title: "Payment Successful",
      message: `${id} has been marked as paid.`,
    });
    toast.success(`Claim ${id} paid successfully`);
    router.push("/finance/dashboard");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      setProofPreview(URL.createObjectURL(file));
    }
  };

  const actions =
    reimbursement.status === "approved_admin" ? (
      <div className="w-full space-y-4 mt-6 p-6 border border-border/50 rounded-xl bg-card shadow-sm">
        <h3 className="font-heading font-semibold text-lg">Process Payment</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Internal Note (Optional)
            </label>
            <textarea
              className="w-full rounded-md border border-input bg-background text-sm p-3 min-h-[80px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Add transfer reference, notes, etc."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Payment Proof (Optional Mock)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="text-sm max-w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80 cursor-pointer"
              accept="image/*,application/pdf"
            />
            {proofFile && (
              <p className="text-xs text-muted-foreground mt-2">
                Staged: {proofFile.name}
              </p>
            )}
          </div>
          <Button
            variant="secondary"
            onClick={handlePay}
            className="w-full mt-2"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" /> Mark as Paid & Release
          </Button>
        </div>
      </div>
    ) : undefined;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="-ml-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <Link href="/finance/dashboard">
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </Button>
      <PageHeader
        title="Disbursement Detail"
        description={`Process and verify payment for ${reimbursement.id}.`}
      />
      <ReimbursementDetail reimbursement={reimbursement} actions={actions} />
    </div>
  );
}
