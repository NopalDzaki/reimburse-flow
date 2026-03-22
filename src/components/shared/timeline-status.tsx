import { StatusBadge } from "@/components/shared/status-badge";
import { formatDateID } from "@/lib/utils";
import type { ReimbursementHistoryItem } from "@/types";

export function TimelineStatus({ history }: { history: ReimbursementHistoryItem[] }) {
  return (
    <div className="relative space-y-4">
      <div className="absolute left-[11px] top-4 h-[calc(100%-32px)] w-px bg-border" />
      {history.map((item, idx) => (
        <div key={`${item.status}-${idx}`} className="relative flex gap-4">
          <div className="mt-1.5 h-6 w-6 shrink-0 rounded-full border-[4px] border-background bg-primary z-10" />
          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm space-y-2 flex-1 relative top-[-6px]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={item.status} />
                {item.actorName && <span className="text-sm font-medium text-muted-foreground">by {item.actorName}</span>}
              </div>
              <p className="text-xs text-muted-foreground font-medium">{formatDateID(item.createdAt)}</p>
            </div>
            {item.note && <p className="text-sm text-foreground/90 leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50">{item.note}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
