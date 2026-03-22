"use client"

import * as React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Paperclip } from "lucide-react"
import { useReports } from "@/context/report-context"
import { useAuth } from "@/context/auth-context"
import { getRelativeTime, formatDateID } from "@/lib/utils"

interface SharedReportDetailProps {
  id: string
  role: "user" | "admin" | "finance" | "superadmin"
  backHref: string
}

export function SharedReportDetail({ id, role, backHref }: SharedReportDetailProps) {
  const { getById, addReply } = useReports()
  const { user } = useAuth()
  const [replyText, setReplyText] = React.useState("")
  
  const report = getById(id)

  if (!report) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
        <p>Report not found.</p>
        <Link href={backHref}><Button variant="outline">Go Back</Button></Link>
      </div>
    )
  }

  const handleReply = () => {
    if (!replyText.trim()) return
    addReply(id, replyText, user?.id ?? "unknown")
    setReplyText("")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={backHref}><Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <p className="text-xs text-muted-foreground font-mono">{report.id}</p>
          <PageHeader title={report.title} />
        </div>
      </div>

      {/* Metadata Card */}
      <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Status</p><StatusBadge status={report.status} /></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Priority</p><StatusBadge status={report.priority} /></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Category</p><span className="text-sm font-medium text-foreground">{report.category}</span></div>
          <div className="space-y-1"><p className="text-xs text-muted-foreground">Submitted</p><span className="text-sm text-muted-foreground">{formatDateID(report.createdAt)}</span></div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm space-y-2">
        <p className="text-sm font-medium text-foreground">Issue Description</p>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{report.description}</p>
      </div>

      {/* Conversation Thread */}
      {report.replies && report.replies.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-border/40">
          <h3 className="text-sm font-semibold mb-4">Conversation History</h3>
          {report.replies.map((msg) => {
            if (msg.isSystem) return (
              <div key={msg.id} className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border/50" />
                <span className="shrink-0 px-3 py-1 rounded-full border border-border/50 bg-muted/50">{msg.body}</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>
            )
            const isMe = msg.userId === user?.id
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? "relative flex-row" : "flex-row-reverse"}`}>
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold text-foreground">
                  {isMe ? (user?.name?.[0] || 'U') : 'S'}
                </div>
                <div className={`flex-1 max-w-[80%] ${isMe ? "" : "flex flex-col items-end"}`}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xs font-semibold text-foreground">{isMe ? user?.name : "Superadmin"}</span>
                    <span className="text-xs text-muted-foreground">{getRelativeTime(msg.createdAt)}</span>
                  </div>
                  <div className={`rounded-xl p-4 text-sm leading-relaxed ${isMe ? "bg-card border border-border/50 text-foreground" : "bg-primary/10 text-foreground border border-primary/20"}`}>
                    {msg.body}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Reply Box */}
      {report.status !== "resolved" && report.status !== "closed" && (
        <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-3">
          <p className="text-sm font-medium text-foreground">Add Follow-up</p>
          <Textarea 
            placeholder="Write your follow-up message…" 
            className="resize-none min-h-[100px]" 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground"><Paperclip className="h-4 w-4" /> Attach file</Button>
            <Button variant="default" size="sm" className="gap-2" onClick={handleReply}><Send className="h-4 w-4" /> Send Reply</Button>
          </div>
        </div>
      )}
    </div>
  )
}
