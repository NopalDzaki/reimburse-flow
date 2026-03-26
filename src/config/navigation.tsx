import {
  LayoutDashboard,
  FileText,
  History,
  MessageSquareWarning,
  UserCircle,
  Settings,
  Banknote,
  Activity,
  Users,
} from "lucide-react";
import { NavItem } from "@/components/layout/sidebar";

// Mock definitions for navigation per role based on implementation plan

export const USER_NAV: NavItem[] = [
  { title: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { title: "History", href: "/user/history", icon: History },
  { title: "Reports", href: "/user/reports", icon: MessageSquareWarning },
  { title: "Profile", href: "/user/profile", icon: UserCircle },
];

export const ADMIN_NAV: NavItem[] = [
  { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Review Queue", href: "/admin/review", icon: FileText },
  { title: "Activity", href: "/admin/activity", icon: Activity },
  { title: "Reports", href: "/admin/reports", icon: MessageSquareWarning },
  { title: "Profile", href: "/admin/profile", icon: UserCircle },
];

export const FINANCE_NAV: NavItem[] = [
  { title: "Dashboard", href: "/finance/dashboard", icon: LayoutDashboard },
  { title: "Payment Queue", href: "/finance/payments", icon: Banknote },
  { title: "Activity", href: "/finance/activity", icon: Activity },
  { title: "Reports", href: "/finance/reports", icon: MessageSquareWarning },
  { title: "Profile", href: "/finance/profile", icon: UserCircle },
];

export const SUPERADMIN_NAV: NavItem[] = [
  { title: "Dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/superadmin/users", icon: Users },
  { title: "All Claims", href: "/superadmin/claims", icon: FileText },
  { title: "Tickets", href: "/superadmin/tickets", icon: MessageSquareWarning },
  { title: "Audit Trail", href: "/superadmin/audit", icon: Activity },
  { title: "Profile", href: "/superadmin/profile", icon: UserCircle },
];
