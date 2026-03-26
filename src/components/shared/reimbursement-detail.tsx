"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { TimelineStatus } from "@/components/shared/timeline-status";
import { formatCurrencyIDR, formatDateID } from "@/lib/utils";
import type { Reimbursement } from "@/types";
import { Eye } from "lucide-react";

interface ReimbursementDetailProps {
  reimbursement: Reimbursement;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  showPaymentProof?: boolean;
}

export function ReimbursementDetail({
  reimbursement,
  actions,
  footer,
  showPaymentProof = true,
}: ReimbursementDetailProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full">
                {reimbursement.id}
              </Badge>
              <StatusBadge status={reimbursement.status} />
              {reimbursement.reviewedBy && (
                <Badge variant="outline" className="rounded-full text-xs">
                  Reviewed by {reimbursement.reviewedBy}
                </Badge>
              )}
            </div>
            <CardTitle className="text-2xl">{reimbursement.title}</CardTitle>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {reimbursement.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow
              label="Amount"
              value={formatCurrencyIDR(reimbursement.amount)}
              highlight
            />
            <InfoRow
              label="Transaction Date"
              value={formatDateID(reimbursement.transactionDate)}
            />
            <InfoRow label="Category" value={reimbursement.category} />
            <InfoRow
              label="Submitted"
              value={formatDateID(reimbursement.submittedAt)}
            />
            <InfoRow
              label="Bank"
              value={`${reimbursement.bankName} • ${reimbursement.accountNumber}`}
            />
            <InfoRow
              label="Account Holder"
              value={reimbursement.accountHolderName}
            />
          </div>

          {actions && (
            <div className="rounded-xl border border-border/50 bg-muted/30 p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Actions</p>
                <p className="text-xs text-muted-foreground">
                  Approve, reject, or mark as paid with notes.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">{actions}</div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Status Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <TimelineStatus history={reimbursement.history} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Attachments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <Attachment label="Receipt" href={reimbursement.receiptImage} />
            <Attachment label="Item Photo" href={reimbursement.itemImage} />
            {showPaymentProof && (
              <Attachment
                label="Payment Proof"
                href={reimbursement.paymentProofImage}
              />
            )}
            {(reimbursement.adminNote || reimbursement.financeNote) && (
              <div className="pt-3 border-t border-border/40 space-y-2">
                {reimbursement.adminNote && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Reviewer Note
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {reimbursement.adminNote}
                    </p>
                  </div>
                )}
                {reimbursement.financeNote && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Finance Note
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {reimbursement.financeNote}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {footer}
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-card/50 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p
        className={`text-sm sm:text-base font-semibold mt-1 ${highlight ? "text-foreground" : "text-foreground/90"}`}
      >
        {value || "-"}
      </p>
    </div>
  );
}

function Attachment({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/30 px-3 py-2 text-xs">
        <span>{label}</span>
        <span className="text-muted-foreground">Not uploaded</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-sm text-foreground">
      <span>{label}</span>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="gap-1 text-primary hover:text-primary"
      >
        <Link href={href} target="_blank" rel="noreferrer">
          <Eye className="h-4 w-4" /> View
        </Link>
      </Button>
    </div>
  );
}
