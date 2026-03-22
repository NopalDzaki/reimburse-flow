import * as React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  sub?: React.ReactNode
  trend?: React.ReactNode
  icon?: React.ReactNode
}

export function StatCard({ label, value, sub, trend, icon, className, ...props }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <p className="text-3xl font-heading font-bold text-foreground">{value}</p>
      {trend && <div className="text-sm">{trend}</div>}
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}
