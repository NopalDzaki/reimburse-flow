"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReports } from "@/context/report-context";
import { useAuth } from "@/context/auth-context";
import { useNotifications } from "@/context/notification-context";
import type { Report } from "@/types";
import { toast } from "sonner";

interface SharedReportCreateProps {
  role: "user" | "admin" | "finance" | "superadmin";
  backHref: string;
}

export function SharedReportCreate({
  role,
  backHref,
}: SharedReportCreateProps) {
  const router = useRouter();
  const { createReport } = useReports();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState<Report["category"]>("bug_ui");
  const [priority, setPriority] = React.useState<Report["priority"]>("medium");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    createReport({
      title,
      category,
      priority,
      description,
      createdBy: user?.id ?? "unknown",
    });

    addNotification({
      type: "success",
      title: "Report Submitted",
      message: `Your report has been received and will be reviewed shortly.`,
    });
    toast.success("Report submitted successfully");

    router.push(backHref);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={backHref}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader
          title="Create New Report"
          description="Submit an issue or request to the Superadmin team."
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="report-title">Title</Label>
          <Input
            id="report-title"
            placeholder="Brief summary of the issue…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Report["category"])
              }
              required
            >
              <option value="bug_ui">UI/UX Bug</option>
              <option value="error">System Error</option>
              <option value="akses_akun">Account Access</option>
              <option value="pertanyaan">Question</option>
              <option value="permintaan_fitur">Feature Request</option>
              <option value="lainnya">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Report["priority"])
              }
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the issue in detail. Include steps to reproduce if it's a bug…"
            className="resize-none min-h-[140px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
          <Button
            variant="ghost"
            type="button"
            onClick={() => router.push(backHref)}
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            type="submit"
            className="shadow-lg shadow-primary/20"
          >
            Submit Report
          </Button>
        </div>
      </form>
    </div>
  );
}
