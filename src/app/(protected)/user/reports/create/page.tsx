"use client"

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateReportPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="reports">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <PageHeader title="Create New Report" description="Submit an issue or request to the Superadmin team." />
      </div>

      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <div className="space-y-2">
          <Label htmlFor="report-title">Title</Label>
          <Input id="report-title" placeholder="Brief summary of the issue…" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option value="">Select category…</option>
              <option>Bug</option>
              <option>Reimbursement Issue</option>
              <option>Payment Issue</option>
              <option>Account Access</option>
              <option>UI/UX Problem</option>
              <option>Data Mismatch</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select id="priority" className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option value="">Select priority…</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe the issue in detail. Include steps to reproduce if it's a bug…" className="resize-none min-h-[140px]" />
        </div>

        <div className="space-y-2">
          <Label>Attachment (optional)</Label>
          <div className="rounded-lg border-2 border-dashed border-border p-6 flex flex-col items-center gap-2 text-center hover:bg-muted/30 transition-colors cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground">Click to upload or drag & drop</p>
            <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max 10MB)</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
          <Link href="reports"><Button variant="ghost">Cancel</Button></Link>
          <Button variant="gradient" className="shadow-lg shadow-primary/20">Submit Report</Button>
        </div>
      </div>
    </div>
  )
}
