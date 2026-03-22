"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Paperclip } from "lucide-react"

const MOCK_THREAD = [
  { id: 1, from: "user", name: "Alex Morgan", initials: "AM", time: "Oct 25, 2023 • 10:14 AM", body: "I have been trying to approve claims in bulk for the past two days but the button is greyed out. This is blocking our entire Friday pay cycle." },
  { id: 2, from: "system", body: "Status changed to In Progress by Superadmin" },
  { id: 3, from: "superadmin", name: "System Admin", initials: "SA", time: "Oct 25, 2023 • 2:30 PM", body: "Thank you for reporting this. We've identified the issue — it was caused by a permission scope change in the last deploy. A fix is being staged now and will be live by 5 PM today." },
  { id: 4, from: "user", name: "Alex Morgan", initials: "AM", time: "Oct 25, 2023 • 2:48 PM", body: "Thank you! Will I get a notification once it's fixed, or should I check back?" },
]

export default function UserReportDetailPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/user/reports"><Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <p className="text-xs text-muted-foreground font-mono">TK-1042</p>
          <PageHeader title="Cannot bulk approve claims in review queue" />
        </div>
      </div>

      {/* Metadata Card */}
      <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Status</p><StatusBadge status="in-progress" /></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Priority</p><StatusBadge status="high" /></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Category</p><span className="text-sm font-medium text-foreground">Bug</span></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Submitted</p><span className="text-sm text-muted-foreground">Oct 25, 2023</span></div>
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="space-y-4">
        {MOCK_THREAD.map((msg) => {
          if (msg.from === "system") return (
            <div key={msg.id} className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border/50" />
              <span className="shrink-0 px-3 py-1 rounded-full border border-border/50 bg-muted/50">{msg.body}</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>
          )
          const isUser = msg.from === "user"
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? "flex-row" : "flex-row-reverse"}`}>
              <div className="flex-shrink-0 h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">{msg.initials}</div>
              <div className={`flex-1 max-w-[80%] ${isUser ? "" : "flex flex-col items-end"}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-semibold text-foreground">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <div className={`rounded-xl p-4 text-sm leading-relaxed ${isUser ? "bg-card border border-border/50 text-foreground" : "bg-primary/10 text-foreground border border-primary/20"}`}>
                  {msg.body}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Reply Box (only when status allows) */}
      <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3">
        <p className="text-sm font-medium text-foreground">Add Follow-up</p>
        <Textarea placeholder="Write your follow-up message…" className="resize-none min-h-[100px]" />
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground"><Paperclip className="h-4 w-4" /> Attach file</Button>
          <Button variant="default" size="sm" className="gap-2"><Send className="h-4 w-4" /> Send Reply</Button>
        </div>
      </div>
    </div>
  )
}
