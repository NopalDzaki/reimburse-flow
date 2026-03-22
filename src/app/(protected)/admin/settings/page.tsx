"use client"

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Bell, Zap, ShieldCheck, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const handleSaveRouting = () => {
    toast.success("Routing and SLA settings saved successfully")
  }

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader title="Admin Settings" description="Tune review workflow, routing, and notifications." />

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Bell className="h-4 w-4 text-muted-foreground" /> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            { label: "Urgent claims", desc: "Notify immediately when marked urgent.", on: true },
            { label: "Reassigned to you", desc: "When claims reroute to your queue.", on: true },
            { label: "SLA breaches", desc: "Alerts when items exceed 6h SLA.", on: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2">
              <div>
                <p className="font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <BadgeToggle defaultOn={n.on} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Zap className="h-4 w-4 text-muted-foreground" /> Routing & SLA
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Auto-assign max</Label>
            <Input defaultValue="15" />
            <p className="text-xs text-muted-foreground">Claims auto-assigned before overflow.</p>
          </div>
          <div className="space-y-2">
            <Label>Escalate at</Label>
            <Input defaultValue="6 hours" />
          </div>
          <div className="space-y-2">
            <Label>Fallback reviewer</Label>
            <Input defaultValue="Priya Kumar" />
          </div>
          <div className="space-y-2">
            <Label>Queue capacity</Label>
            <Input defaultValue="45" />
          </div>
        </CardContent>
        <div className="flex justify-end px-6 pb-4">
          <Button variant="default" className="gap-2" onClick={handleSaveRouting}>
            <CheckCircle2 className="h-4 w-4" /> Save routing
          </Button>
        </div>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" /> Risk Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Require receipt OCR for approvals</span>
            <BadgeToggle defaultOn={false} />
          </div>
          <div className="flex items-center justify-between">
            <span>Block duplicate invoices</span>
            <BadgeToggle defaultOn={true} />
          </div>
          <div className="flex items-center justify-between">
            <span>Flag out-of-policy categories</span>
            <BadgeToggle defaultOn={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function BadgeToggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [isOn, setIsOn] = React.useState(defaultOn)
  const toggle = () => {
    setIsOn(!isOn)
    toast.success(`Preference ${!isOn ? 'enabled' : 'disabled'}`)
  }

  return (
    <button onClick={toggle} className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none cursor-pointer ${isOn ? "bg-primary" : "bg-muted"}`}>
      <span className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isOn ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  )
}
