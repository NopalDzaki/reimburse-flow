export default function SuperadminDashboardPage() {
  const auditLogs = [
    { id: 1, text: "Superadmin updated 'Manager' role access in Acme Corp.", time: "08:12 AM TODAY", type: "Role Permission Changed", user: "system", color: "text-info", bg: "bg-info/10" },
    { id: 2, text: "Multiple failed attempts detected from IP 192.168.1.1.", time: "YESTERDAY, 11:45 PM", type: "Failed Login Attempt", user: "security", color: "text-destructive", bg: "bg-destructive/10" },
    { id: 3, text: "'Fintech Innovators' added to the global system.", time: "YESTERDAY, 04:30 PM", type: "New Organization Registered", user: "onboarding", color: "text-primary", bg: "bg-primary/10" },
    { id: 4, text: "Global production API key was rotated successfully.", time: "OCT 12, 02:15 PM", type: "API Key Rotated", user: "system", color: "text-warning", bg: "bg-warning/10" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">System Authority</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-heading font-bold tracking-tight">Superadmin Dashboard</h1>
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="flex h-2 w-2 rounded-full bg-success"></span>System Live</span>
            <span className="uppercase tracking-wider">LAST UPDATED: 2 MINS AGO</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Total Users</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">150+</h2>
          </div>
          <p className="text-sm font-medium text-success mt-2">↗ 12% from last month</p>
        </div>
        
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Organizations</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">12</h2>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Active enterprise licenses</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">System Uptime</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">99.9%</h2>
          </div>
          <p className="text-sm font-medium text-success mt-2 flex items-center gap-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-success/20 items-center justify-center"><span className="h-1.5 w-1.5 rounded-full bg-success"></span></span> All systems operational
          </p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Open Tickets</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-heading font-bold">4</h2>
          </div>
          <p className="text-sm font-medium text-destructive mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-destructive/10">
            ⚠️ 2 urgent escalations
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm h-[320px]">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-heading font-semibold">Recent Registrations</h3>
               <span className="text-sm text-primary font-medium hover:underline cursor-pointer">View All Users</span>
            </div>
            {/* Mock Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium rounded-l-lg">Name</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Last Login</th>
                    <th className="px-4 py-3 font-medium text-right rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">Jordan Devlin</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-info/10 text-info text-xs rounded-sm font-semibold">ORG ADMIN</span></td>
                    <td className="px-4 py-3 text-muted-foreground">Today, 09:42 AM</td>
                    <td className="px-4 py-3 text-right">•••</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">Sarah Chen</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-sm font-semibold">SUBMITTER</span></td>
                    <td className="px-4 py-3 text-muted-foreground">Yesterday</td>
                    <td className="px-4 py-3 text-right">•••</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">Marcus Knight</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-sm font-semibold">APPROVER</span></td>
                    <td className="px-4 py-3 text-muted-foreground">3 days ago</td>
                    <td className="px-4 py-3 text-right">•••</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <button className="flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:border-primary hover:bg-primary/5 transition-all">
              Add New User
            </button>
            <button className="flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:border-primary hover:bg-primary/5 transition-all">
              Configure Roles
            </button>
            <button className="flex items-center justify-center gap-3 rounded-xl border border-border/50 bg-card p-6 shadow-sm hover:border-primary hover:bg-primary/5 transition-all">
              System Settings
            </button>
          </div>
        </div>

        <div className="md:col-span-2 rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-heading font-semibold">Audit Log</h3>
          </div>
          
          <div className="flex-1 relative space-y-6 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
            {auditLogs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4">
                <div className={`absolute left-0 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-4 ring-background z-10 ${log.color}`}>
                   <div className={`h-2.5 w-2.5 rounded-full ${log.bg} border border-current`}></div>
                </div>
                <div className="pl-8 flex flex-col w-full">
                   <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">{log.time}</span>
                   <span className={`text-sm font-semibold font-heading mb-0.5 ${log.color}`}>{log.type}</span>
                   <p className="text-sm text-muted-foreground leading-relaxed">{log.text}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 px-4 border border-border/50 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </div>
  )
}
