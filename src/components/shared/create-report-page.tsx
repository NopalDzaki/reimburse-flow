import * as React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReports } from "@/context/report-context";
import { useAuth } from "@/context/auth-context";
import { useActivity } from "@/context/activity-context";
import { toast } from "sonner";

interface SharedCreateReportPageProps {
  role: "admin" | "finance" | "user";
}

export function SharedCreateReportPage({ role }: SharedCreateReportPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { createReport } = useReports();
  const { addActivity } = useActivity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title || !category || !priority || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    createReport({
      title,
      category: category as any,
      priority: priority as any,
      description,
      createdBy: user?.id || "unknown",
      createdByName: user?.name || "User",
    });

    addActivity({
      type: "report",
      title: "Report baru",
      description: `${user?.name || "User"} melaporkan: ${title}`,
      actorName: user?.name || "User",
      entityType: "report",
    });

    toast.success("Report submitted successfully");
    router.push(`/${role}/reports`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/${role}/reports`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title="Create New Report"
          description="Submit an issue or request to the Superadmin team."
        />
      </div>
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="Brief summary of the issue…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select category…</option>
              <option>Bug</option>
              <option>Reimbursement Issue</option>
              <option>Payment Issue</option>
              <option>Account Access</option>
              <option>UI/UX Problem</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select priority…</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe the issue in detail…"
            className="resize-none min-h-[140px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
          <Link href={`/${role}/reports`}>
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit}
            variant="gradient"
            className="shadow-lg shadow-primary/20"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </div>
    </div>
  );
}
