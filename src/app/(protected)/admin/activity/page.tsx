import * as React from "react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Activity } from "lucide-react";

const DECISIONS = [
  {
    id: "TXN-80100",
    user: "Sarah V.",
    action: "Approved",
    amount: "$88.50",
    category: "Client Lunch",
    time: "2 hours ago",
    status: "approved" as const,
  },
  {
    id: "TXN-79980",
    user: "Robert King",
    action: "Approved",
    amount: "$1,420.00",
    category: "Travel Airfare",
    time: "5 hours ago",
    status: "approved" as const,
  },
  {
    id: "TXN-79870",
    user: "Sam Wilson",
    action: "Rejected",
    amount: "$120.00",
    category: "Personal Phone Bill",
    time: "Yesterday",
    status: "rejected" as const,
  },
  {
    id: "TXN-79800",
    user: "Jordan Smith",
    action: "Approved",
    amount: "$29.00",
    category: "Software Subscription",
    time: "Yesterday",
    status: "approved" as const,
  },
  {
    id: "TXN-79710",
    user: "Mia Laurent",
    action: "Approved",
    amount: "$65.00",
    category: "Office Supplies",
    time: "Oct 22, 2023",
    status: "approved" as const,
  },
];

export default function AdminActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Log"
        description="Your review history and past decisions."
      />

      {DECISIONS.length === 0 ? (
        <EmptyState
          icon={<Activity className="h-7 w-7" />}
          title="No activity yet"
          description="Your review decisions will appear here once you start processing claims."
        />
      ) : (
        <div className="rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-border/30 text-xs uppercase text-muted-foreground bg-muted/30">
              <tr>
                <th className="px-6 py-3 font-medium">Claim</th>
                <th className="px-6 py-3 font-medium">Employee</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
                <th className="px-6 py-3 font-medium">Decision</th>
                <th className="px-6 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {DECISIONS.map((d) => (
                <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {d.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">
                    {d.user}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {d.category}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-foreground">
                    {d.amount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">
                    {d.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
