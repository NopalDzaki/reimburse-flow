"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Banknote,
  Timer,
  Shield,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function FinanceSettingsPage() {
  const handleSaveDisbursement = () => {
    toast.success("Disbursement rules saved successfully");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Finance Settings"
        description="Control payout rails, limits, and alerts."
      />

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Banknote className="h-4 w-4 text-muted-foreground" /> Disbursement
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Primary rail</Label>
            <Input defaultValue="ACH – Same Day" />
          </div>
          <div className="space-y-2">
            <Label>Fallback rail</Label>
            <Input defaultValue="Wire – Domestic" />
          </div>
          <div className="space-y-2">
            <Label>Max per payout</Label>
            <Input defaultValue="$7,500" />
          </div>
          <div className="space-y-2">
            <Label>Daily cap</Label>
            <Input defaultValue="$50,000" />
          </div>
        </CardContent>
        <div className="flex justify-end px-6 pb-4">
          <Button
            variant="default"
            className="gap-2"
            onClick={handleSaveDisbursement}
          >
            <CheckCircle2 className="h-4 w-4" /> Save disbursement rules
          </Button>
        </div>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Timer className="h-4 w-4 text-muted-foreground" /> Cutoffs & SLAs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
            <div>
              <p className="font-medium text-foreground">Same-day cutoff</p>
              <p className="text-xs text-muted-foreground">
                Payments submitted before this time go out today.
              </p>
            </div>
            <Badge variant="outline" className="rounded-full">
              5:00 PM
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
            <div>
              <p className="font-medium text-foreground">SLA target</p>
              <p className="text-xs text-muted-foreground">
                From approval to payout release.
              </p>
            </div>
            <Badge variant="secondary" className="rounded-full">
              4 hours
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Shield className="h-4 w-4 text-muted-foreground" /> Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <ToggleRow label="Dual approval above $10k" defaultOn />
          <ToggleRow label="Block mismatched bank name" defaultOn />
          <ToggleRow label="Notify on rapid velocity spikes" />
          <ToggleRow
            label="Require biometric on mobile payouts"
            defaultOn
            icon={<Smartphone className="h-4 w-4" />}
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
    toast.success(`Control "${label}" ${!isOn ? "enabled" : "disabled"}`);
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
