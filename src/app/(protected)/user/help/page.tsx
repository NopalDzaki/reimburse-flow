"use client";

import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  FileText,
  MessageSquarePlus,
  MessageCircle,
  ChevronRight,
  FileQuestion,
} from "lucide-react";
import { toast } from "sonner";

export default function UserHelpCenterPage() {
  const faqs = [
    {
      q: "How long does reimbursement approval take?",
      a: "Generally, the approval process takes 1-2 business days by your manager/admin, and an additional 1-3 business days for finance to release the payment.",
    },
    {
      q: "What documentation do I need to provide?",
      a: "You must provide clear photographs or PDFs of your actual receipts. For travel, boarding passes or digital itineraries are also accepted.",
    },
    {
      q: "Can I edit a claim after it's been submitted?",
      a: "No, once a claim is submitted, it is locked for review. If you need to make changes, please contact your approver to reject it so you can submit a new one.",
    },
    {
      q: "My reimbursement was rejected. What do I do?",
      a: "Check the notes left by the reviewer on the claim details page. Usually, rejections happen due to missing context or unreadable receipts. You can resubmit entirely a new claim with the requested corrections.",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Help Center"
        description="Find answers to common questions or contact support if you need further assistance."
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Reimbursement Guidelines
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Review the company policy on what expenses can be claimed and the
              maximum limits.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              toast.info("Redirecting to comprehensive policy directory...")
            }
          >
            Read Policy Directory
          </Button>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center mb-4">
              <MessageSquarePlus className="h-5 w-5 text-info" />
            </div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              System Support Tickets
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Encountering bugs or UI issues? Open a support ticket and we'll
              look into it.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary" className="w-full">
              <Link href="/user/reports">View My Tickets</Link>
            </Button>
            <Button asChild variant="default" className="w-full">
              <Link href="/user/reports/create">New Ticket</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <h3 className="text-lg font-heading font-semibold flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-muted-foreground" />{" "}
            Frequently Asked Questions
          </h3>
        </div>
        <div className="divide-y divide-border/50">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-6 hover:bg-muted/10 transition-colors"
            >
              <summary className="font-semibold text-foreground group-hover:text-primary transition-colors flex justify-between items-center cursor-pointer list-none">
                {faq.q}
                <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed border-l-2 border-primary/20 pl-3 ml-1">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm mt-8">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Still need help?
          </h3>
          <p className="text-sm text-muted-foreground">
            You can chat directly with finance administrators.
          </p>
        </div>
        <Button
          className="mt-4 sm:mt-0 gap-2"
          onClick={() => toast.success("Connecting to live support...")}
        >
          <MessageCircle className="h-4 w-4" /> Live Chat
        </Button>
      </div>
    </div>
  );
}
