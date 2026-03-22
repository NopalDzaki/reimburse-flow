"use client"

import * as React from "react"
import { UploadCloud, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SubmitClaimPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">Submit New Claim</h1>
        <p className="text-muted-foreground">Upload your receipt and provide details for reimbursement.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reimbursement Details</CardTitle>
          <CardDescription>Fill out the required information. Amount must strictly match the receipt.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Expense Title</Label>
              <Input id="title" placeholder="e.g. Client Dinner - Blue Ribbon" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category" 
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select category...</option>
                <option value="travel">Travel & Lodging</option>
                <option value="meals">Meals & Entertainment</option>
                <option value="software">Software & Subscriptions</option>
                <option value="office">Office Supplies</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (IDR)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">Rp </span>
                <Input id="amount" placeholder="0.00" className="pl-7" type="number" step="0.01" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Transaction Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Justification</Label>
            <Textarea 
              id="description" 
              placeholder="Briefly explain the business purpose of this expense..." 
              className="resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label>Receipt Attachment</Label>
            <div className="rounded-xl border-2 border-dashed border-border p-12 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Click to upload or drag and drop</h3>
              <p className="text-sm text-muted-foreground mb-4">PDF, JPG or PNG (max. 10MB)</p>
              <Button variant="secondary" size="sm">Browse Files</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t border-border/50 pt-6">
          <Button variant="ghost">Cancel</Button>
          <Button variant="gradient" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Submit Claim
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
