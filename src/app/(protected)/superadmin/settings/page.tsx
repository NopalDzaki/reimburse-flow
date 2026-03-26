"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Users, CheckCircle2, Bell } from "lucide-react";
import { toast } from "sonner";

export default function SuperadminSettingsPage() {
  const handleSaveControls = () => {
    toast.success("Platform access controls updated");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Superadmin Settings"
        description="Platform controls, audit exports, and critical alerts."
      />

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Shield className="h-4 w-4 text-muted-foreground" /> Access Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Break-glass window</Label>
            <Input defaultValue="10 minutes" />
            <p className="text-xs text-muted-foreground">
              Temporary elevated access expires automatically.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Dual approval threshold</Label>
            <Input defaultValue="$10,000" />
          </div>
          <div className="space-y-2">
            <Label>Admin session timeout</Label>
            <Input defaultValue="20 minutes" />
          </div>
          <div className="space-y-2">
            <Label>Audit mirror</Label>
            <Input defaultValue="s3://reimburseflow-audit" />
          </div>
        </CardContent>
        <div className="flex justify-end px-6 pb-4">
          <Button
            variant="default"
            className="gap-2"
            onClick={handleSaveControls}
          >
            <CheckCircle2 className="h-4 w-4" /> Save controls
          </Button>
        </div>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Activity className="h-4 w-4 text-muted-foreground" /> Audit &
            Exports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
            <div>
              <p className="font-medium text-foreground">Weekly audit export</p>
              <p className="text-xs text-muted-foreground">
                Sent every Monday 8:00 AM.
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              Scheduled
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
            <div>
              <p className="font-medium text-foreground">User access reviews</p>
              <p className="text-xs text-muted-foreground">
                Quarterly attestation reminders.
              </p>
            </div>
            <Badge variant="outline" className="rounded-full">
              Next: Apr
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Bell className="h-4 w-4 text-muted-foreground" /> Critical Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ToggleRow label="High-risk claim created" />
          <ToggleRow label="Multiple failed payouts" defaultOn />
          <ToggleRow
            label="Admin role changes"
            defaultOn
            icon={<Users className="h-4 w-4" />}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ToggleRow({
  label,
  defaultOn = false,
  icon,
}: {
  label: string;
  defaultOn?: boolean;
  icon?: React.ReactNode;
}) {
  const [isOn, setIsOn] = React.useState(defaultOn);
  const toggle = () => {
    setIsOn(!isOn);
    toast.success(
      `Critical alert "${label}" ${!isOn ? "enabled" : "disabled"}`,
    );
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border/50 px-3 py-2">
      <div className="flex items-center gap-2 text-sm text-foreground">
        {icon}
        {label}
      </div>
      <button
        onClick={toggle}
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none cursor-pointer ${isOn ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isOn ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}
