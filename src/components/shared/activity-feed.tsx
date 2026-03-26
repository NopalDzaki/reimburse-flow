import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/utils";
import type { ActivityLog } from "@/types";
import {
  Bell,
  CheckCircle2,
  FileText,
  MessageSquare,
  RefreshCw,
  StickyNote,
  UserRoundCog,
  Wallet,
  XCircle,
} from "lucide-react";

const iconMap = {
  reimbursement: FileText,
  approval: CheckCircle2,
  rejection: XCircle,
  payment: Wallet,
  report: MessageSquare,
  report_update: RefreshCw,
  report_response: StickyNote,
  user_update: UserRoundCog,
} as const;

export function ActivityFeed({
  activities,
  maxItems = 10,
}: {
  activities: ActivityLog[];
  maxItems?: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.slice(0, maxItems).map((item) => {
          const IconEl =
            (iconMap as Record<string, typeof Bell>)[item.type] ?? Bell;
          return (
            <div key={item.id} className="flex gap-4">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground border border-border/50">
                <IconEl size={18} />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {getRelativeTime(item.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="text-sm text-muted-foreground py-4 text-center">
            No recent activities.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
