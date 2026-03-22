"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Mail,
  Building2,
  CheckCircle2,
  ClipboardCheck,
} from "lucide-react";

export default function AdminProfilePage() {
  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Admin Profile"
        description="Manage your reviewer identity and approval guardrails."
        actions={
          <Badge variant="secondary" className="rounded-full">
            Manager Access
          </Badge>
        }
      />

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              RA
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Riley Anders
              </p>
              <p className="text-sm text-muted-foreground">
                Admin • Claim Review
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" /> riley.anders@company.com
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" /> Operations • Full-time
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" /> MFA enforced on
            approvals
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClipboardCheck className="h-4 w-4 text-primary" /> SLA target: 4h
            to decision
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Reviewer Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Daily approval capacity</Label>
            <Input defaultValue="30" />
            <p className="text-xs text-muted-foreground">
              Used to load-balance queues.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Approval limit</Label>
            <Input defaultValue="$5,000" />
            <p className="text-xs text-muted-foreground">
              Claims above this escalate to Finance.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Backup approver</Label>
            <Input placeholder="Assign backup" defaultValue="Morgan Lane" />
          </div>
          <div className="space-y-2">
            <Label>Escalation channel</Label>
            <Input
              placeholder="email or Slack"
              defaultValue="#claims-escalations"
            />
          </div>
        </CardContent>
        <div className="flex justify-end px-6 pb-4">
          <Button variant="default" className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> Save reviewer profile
          </Button>
        </div>
      </Card>
    </div>
  );
}
