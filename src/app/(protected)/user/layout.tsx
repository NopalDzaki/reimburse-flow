import * as React from "react";
import { AppShell } from "@/components/layout/app-shell";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell roleConfig="user" basePath="/user">
      {children}
    </AppShell>
  );
}
