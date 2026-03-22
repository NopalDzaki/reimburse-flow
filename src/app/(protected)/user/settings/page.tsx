"use client"

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, Bell, Lock } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title="Settings" description="Manage your application preferences." />

      {/* Appearance */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-2"><Sun className="h-4 w-4 text-muted-foreground" /> Appearance</h3>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Theme</p><p className="text-xs text-muted-foreground">Choose light or dark interface.</p></div>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button onClick={() => setTheme("light")} className={`px-4 py-2 text-xs font-medium transition-colors flex items-center gap-1.5 ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-muted"}`}>
              <Sun className="h-3.5 w-3.5" /> Light
            </button>
            <button onClick={() => setTheme("dark")} className={`px-4 py-2 text-xs font-medium transition-colors flex items-center gap-1.5 ${theme === "dark" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:bg-muted"}`}>
              <Moon className="h-3.5 w-3.5" /> Dark
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-2"><Bell className="h-4 w-4 text-muted-foreground" /> Notifications</h3>
        {[
          { label: "Claim Status Updates", desc: "Get notified when your claim status changes." },
          { label: "Support Ticket Replies", desc: "Receive alerts when Superadmin responds to your tickets." },
          { label: "Payout Confirmations", desc: "Be notified when a payment is released to your account." },
        ].map((n) => (
          <div key={n.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <div><p className="text-sm font-medium text-foreground">{n.label}</p><p className="text-xs text-muted-foreground">{n.desc}</p></div>
            <button className="relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent bg-primary transition-colors focus-visible:outline-none cursor-pointer">
              <span className="translate-x-4 pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-4">
        <h3 className="font-heading font-semibold text-foreground flex items-center gap-2"><Lock className="h-4 w-4 text-muted-foreground" /> Security</h3>
        <div className="flex items-center justify-between">
          <div><p className="text-sm font-medium text-foreground">Password</p><p className="text-xs text-muted-foreground">Last changed 3 months ago.</p></div>
          <Button variant="outline" size="sm">Change Password</Button>
        </div>
      </div>
    </div>
  )
}
