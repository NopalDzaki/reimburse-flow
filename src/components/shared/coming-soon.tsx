import * as React from "react";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ComingSoonProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description: string;
  showBackButton?: boolean;
  backHref?: string;
  backHrefLabel?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({
  title = "Coming Soon",
  description,
  showBackButton = true,
  backHref = "/",
  backHrefLabel = "Back to Dashboard",
  icon = <Clock className="h-10 w-10 text-primary" />,
  className,
  ...props
}: ComingSoonProps) {
  return (
    <div
      className={cn(
        "flex min-h-[60vh] flex-col items-center justify-center p-6 sm:p-12 transition-opacity duration-200 animate-in fade-in zoom-in-95",
        className,
      )}
      {...props}
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Soft Card Container */}
        <div className="w-full rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          {/* Icon Area */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
            {icon}
          </div>

          {/* Content Area */}
          <div className="mb-8 space-y-3">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action Area */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 justify-center">
            {showBackButton && (
              <Button
                asChild
                variant="default"
                className="w-full sm:w-auto gap-2"
              >
                <Link href={backHref}>
                  <ArrowLeft className="h-4 w-4" />
                  {backHrefLabel}
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
