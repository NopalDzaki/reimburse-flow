import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      roleConfig="finance"
      basePath="/finance"
    >
      {children}
    </AppShell>
  );
}
