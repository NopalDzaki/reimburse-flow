"use client"

import * as React from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Mail, Building2, Shield, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = React.useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Profile saved successfully")
    }, 600)
  }

  const handleAvatarClick = () => {
    toast.info("Avatar upload dialog opened")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title="Profile" description="Your account information and identity." />

      {/* Avatar Card */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center text-3xl font-bold font-heading text-primary">{user?.name ? user.name[0].toUpperCase() : "U"}</div>
          <button onClick={handleAvatarClick} className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
            <Camera className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-1">
          <h2 className="text-xl font-heading font-bold text-foreground">{user?.name || "User"}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4" /> {user?.email || "user@example.com"}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building2 className="h-4 w-4" /> Engineering • Full-Time</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm ${user?.role === 'superadmin' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'} text-xs font-semibold uppercase tracking-wider`}>
              <Shield className="h-3 w-3" /> {user?.role || "employee"}
            </span>
          </div>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
        <h3 className="font-heading font-semibold text-foreground">Personal Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><Label>Full Name</Label><Input defaultValue={user?.name} /></div>
          <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email} type="email" /></div>
          <div className="space-y-2"><Label>Department</Label><Input defaultValue="Engineering" /></div>
          <div className="space-y-2"><Label>Title</Label><Input defaultValue="Software Engineer" /></div>
        </div>
        <div className="flex justify-end pt-2 border-t border-border/50">
          <Button variant="default" onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
