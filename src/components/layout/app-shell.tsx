"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileNav } from "./mobile-nav";
import { useAuth } from "@/context/auth-context";
import {
  USER_NAV,
  ADMIN_NAV,
  FINANCE_NAV,
  SUPERADMIN_NAV,
} from "@/config/navigation";

interface AppShellProps {
  children: React.ReactNode;
  roleConfig: "user" | "admin" | "finance" | "superadmin";
  basePath: string;
}

export function AppShell({
  children,
  roleConfig,
  basePath,
}: AppShellProps) {
  const { user } = useAuth();
  const userName = user?.name || "Guest";
  const userRole = user?.role || roleConfig;
  const avatarInitial = userName.substring(0, 2).toUpperCase();
  const navItems = React.useMemo(() => {
    switch (roleConfig) {
      case "user":
        return USER_NAV;
      case "admin":
        return ADMIN_NAV;
      case "finance":
        return FINANCE_NAV;
      case "superadmin":
        return SUPERADMIN_NAV;
      default:
        return USER_NAV;
    }
  }, [roleConfig]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar navItems={navItems} basePath={basePath} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:ml-64 relative min-w-0">
        <Topbar
          userName={userName}
          userRole={userRole}
          avatarInitial={avatarInitial}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav roleConfig={roleConfig} />
    </div>
  );
}
