"use client";

import { AuthProvider } from "@/context/auth-context";
import { ReimbursementProvider } from "@/context/reimbursement-context";
import { ActivityProvider } from "@/context/activity-context";
import { ReportProvider } from "@/context/report-context";
import { UserProvider } from "@/context/user-context";
import { NotificationProvider } from "@/context/notification-context";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        <AuthProvider>
          <ReimbursementProvider>
            <ReportProvider>
              <ActivityProvider>
                <NotificationProvider>
                  {children}
                  <Toaster richColors position="top-right" />
                </NotificationProvider>
              </ActivityProvider>
            </ReportProvider>
          </ReimbursementProvider>
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
