"use client";

import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Activity, Mail, Building2, CheckCircle2 } from "lucide-react";

export default function SuperadminProfilePage() {
  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Superadmin Profile"
        description="Platform oversight, compliance identity, and audit preferences."
        actions={
          <Badge variant="destructive" className="rounded-full">
            Root Access
          </Badge>
        }
      />

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-lg font-bold text-destructive">
              SA
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                Sloane Avery
              </p>
              <p className="text-sm text-muted-foreground">
                Superadmin • Compliance
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" /> sloane.avery@company.com
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" /> Compliance & Audit
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" /> Break-glass access
            logged
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 text-success" /> All admin actions
            mirrored to audit trail
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Oversight Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Session timeout</Label>
            <Input defaultValue="20 minutes" />
            <p className="text-xs text-muted-foreground">
              Short windows reduce privilege risk.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Dual approval threshold</Label>
            <Input defaultValue="$10,000" />
          </div>
          <div className="space-y-2">
            <Label>Audit export email</Label>
            <Input defaultValue="audit@company.com" />
          </div>
          <div className="space-y-2">
            <Label>Weekly summary</Label>
            <Input defaultValue="Mondays 8:00 AM" />
          </div>
        </CardContent>
        <div className="flex justify-end px-6 pb-4">
          <Button variant="default" className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> Save oversight rules
          </Button>
        </div>
      </Card>
    </div>
  );
}
