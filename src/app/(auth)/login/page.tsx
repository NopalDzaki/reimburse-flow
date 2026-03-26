"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Briefcase, Key } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsRole } = useAuth();

  const handleLogin = (role: string) => {
    loginAsRole(role as UserRole);
    router.push(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden">
      {/* Premium background styling */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

      <div className="z-10 w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 font-heading font-bold text-3xl tracking-tight mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <span className="text-2xl">R</span>
            </div>
            ReimburseFlow
          </div>
          <p className="text-muted-foreground">
            Select a role template to explore the financial app.
          </p>
        </div>

        <Card className="border-border/50 shadow-xl shadow-background/50">
          <CardHeader className="text-center pb-4">
            <CardTitle>Development Sandbox</CardTitle>
            <CardDescription>
              Login bypass enabled for testing roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-16 justify-start px-6 gap-4 hover:border-primary hover:bg-primary/5 transition-colors"
              onClick={() => handleLogin("user")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-base font-heading">
                  Mock as standard User
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Can submit claims and open tickets.
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full h-16 justify-start px-6 gap-4 hover:border-warning hover:bg-warning/5 transition-colors"
              onClick={() => handleLogin("admin")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-base font-heading">
                  Mock as Manager (Admin)
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Can review and approve pending claims.
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full h-16 justify-start px-6 gap-4 hover:border-info hover:bg-info/5 transition-colors"
              onClick={() => handleLogin("finance")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                <LineChartIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-base font-heading">
                  Mock as Finance
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Can monitor liquidity and issue payments.
                </span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full h-16 justify-start px-6 gap-4 hover:border-destructive hover:bg-destructive/5 transition-colors"
              onClick={() => handleLogin("superadmin")}
            >
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-foreground">
                <Key className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold text-base font-heading">
                  Mock as Superadmin
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  Has global audit and helpdesk access.
                </span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LineChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
