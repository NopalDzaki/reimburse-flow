"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-heading font-bold tracking-tight">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-lg">
            You do not have the required permissions to view this page. Your
            role restricts access to this area of the financial system.
          </p>
        </div>
        <div className="pt-8 w-full">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
          <Button
            onClick={() => router.push("/login")}
            variant="ghost"
            className="w-full mt-4"
          >
            Return to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
