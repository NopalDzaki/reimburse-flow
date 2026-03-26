import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function SuperadminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      roleConfig="superadmin"
      basePath="/superadmin"
    >
      {children}
    </AppShell>
  );
}
