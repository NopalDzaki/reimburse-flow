"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  History,
  MessageSquareWarning,
  Banknote,
  Activity,
  Users,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";

interface BottomNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ElementType;
}

const MOBILE_NAV_MAP: Record<string, BottomNavItem[]> = {
  user: [
    { title: "Home", href: "/user/dashboard", icon: LayoutDashboard },
    { title: "Submit", href: "/user/submit", icon: FileText },
    { title: "History", href: "/user/history", icon: History },
    { title: "Reports", href: "/user/reports", icon: MessageSquareWarning },
  ],
  admin: [
    { title: "Home", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Review", href: "/admin/review", icon: FileText },
    { title: "Activity", href: "/admin/activity", icon: Activity },
    { title: "Reports", href: "/admin/reports", icon: MessageSquareWarning },
  ],
  finance: [
    { title: "Home", href: "/finance/dashboard", icon: LayoutDashboard },
    { title: "Payments", href: "/finance/payments", icon: Banknote },
    { title: "Activity", href: "/finance/activity", icon: Activity },
    { title: "Reports", href: "/finance/reports", icon: MessageSquareWarning },
  ],
  superadmin: [
    { title: "Home", href: "/superadmin/dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/superadmin/users", icon: Users },
    { title: "Claims", href: "/superadmin/claims", icon: FileText },
    {
      title: "Tickets",
      href: "/superadmin/tickets",
      icon: MessageSquareWarning,
    },
  ],
};

const QUICK_ACTIONS: Record<string, QuickAction> = {
  user: { label: "New Claim", href: "/user/submit", icon: FileText },
  admin: { label: "Review Claims", href: "/admin/review", icon: FileText },
  finance: { label: "Pay Queue", href: "/finance/payments", icon: Banknote },
  superadmin: { label: "Manage Users", href: "/superadmin/users", icon: Users },
};

const UTILITY_LINKS: Record<string, BottomNavItem[]> = {
  user: [
    { title: "Profile", href: "/user/profile", icon: UserCircle },
    { title: "Settings", href: "/user/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ],
  admin: [
    { title: "Profile", href: "/admin/profile", icon: UserCircle },
    { title: "Settings", href: "/admin/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ],
  finance: [
    { title: "Profile", href: "/finance/profile", icon: UserCircle },
    { title: "Settings", href: "/finance/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ],
  superadmin: [
    { title: "Profile", href: "/superadmin/profile", icon: UserCircle },
    { title: "Settings", href: "/superadmin/settings", icon: Settings },
    { title: "Logout", href: "/login", icon: LogOut },
  ],
};

interface MobileNavProps {
  roleConfig: "user" | "admin" | "finance" | "superadmin";
}

export function MobileNav({ roleConfig }: MobileNavProps) {
  const pathname = usePathname();
  const items = MOBILE_NAV_MAP[roleConfig] ?? [];
  const quickAction = QUICK_ACTIONS[roleConfig];
  const utilityItems = UTILITY_LINKS[roleConfig] ?? [];
  const QuickIcon = quickAction?.icon;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      {quickAction && (
        <div className="px-4 pt-3">
          <Link
            href={quickAction.href}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            {QuickIcon && <QuickIcon className="h-4 w-4" />}
            {quickAction.label}
          </Link>
        </div>
      )}

      <div className="flex h-16 items-stretch justify-around px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              />
              {item.title}
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>

      {utilityItems.length > 0 && (
        <div className="border-t border-border/50 px-3 py-2 grid grid-cols-3 gap-2 text-[11px] font-medium">
          {utilityItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            const isLogout = item.title === "Logout";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 transition-colors",
                  isLogout
                    ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                    : isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      )}

      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  );
}
