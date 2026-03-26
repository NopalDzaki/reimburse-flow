"use client";

import * as React from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReimbursements } from "@/context/reimbursement-context";
import { useAuth } from "@/context/auth-context";
import { useActivity } from "@/context/activity-context";
import { useNotifications } from "@/context/notification-context";
import { toast } from "sonner";

// Define the validation schema
const claimSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  transactionDate: z.string().min(1, "Transaction date is required"),
  description: z
    .string()
    .min(10, "Please provide a detailed justification (min 10 characters)"),
  receipt: z
    .any()
    .refine(
      (val) => val !== null && val !== undefined && val !== "",
      "Receipt attachment is required",
    ),
});

type ClaimFormValues = z.infer<typeof claimSchema>;

export default function SubmitClaimPage() {
  const router = useRouter();
  const { createReimbursement } = useReimbursements();
  const { user } = useAuth();
  const { addActivity } = useActivity();
  const { addNotification } = useNotifications();

  // Mock file upload state
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = React.useState<string | null>(
    null,
  );
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
      setValue("receipt", file, { shouldValidate: true });
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
      setValue("receipt", file, { shouldValidate: true });
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClaimFormValues>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      title: "",
      category: "",
      amount: 0,
      transactionDate: "",
      description: "",
      receipt: null,
    },
  });

  const onSubmit = async (data: ClaimFormValues) => {
    // Artificial delay to show submission state
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newClaim = createReimbursement({
      title: data.title,
      description: data.description,
      amount: data.amount,
      category: data.category,
      transactionDate: data.transactionDate,
      submittedBy: user?.id ?? "unknown",
      submittedByName: user?.name ?? "User",
      bankName: "Default Bank",
      accountNumber: "0000000000",
      accountHolderName: user?.name ?? "User",
      receiptImage: receiptPreview || "dummy.jpg",
    });

    addActivity({
      type: "reimbursement",
      title: "Pengajuan baru",
      description: `${user?.name || "User"} mengajukan ${newClaim.title}`,
      actorName: user?.name || "User",
      relatedEntityId: newClaim.id,
      entityType: "reimbursement",
    });

    addNotification({
      type: "success",
      title: "Claim Submitted",
      message: `Claim ${newClaim.id} submitted for review.`,
    });
    toast.success("Reimbursement claim submitted successfully");
    router.push("/user/history");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-heading font-bold tracking-tight">
          Submit New Claim
        </h1>
        <p className="text-muted-foreground">
          Upload your receipt and provide details for reimbursement.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Reimbursement Details</CardTitle>
            <CardDescription>
              Fill out the required information. Amount must strictly match the
              receipt.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Expense Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Client Dinner - Blue Ribbon"
                  {...register("title")}
                  className={
                    errors.title
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  {...register("category")}
                  className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${errors.category ? "border-destructive focus-visible:ring-destructive" : "border-input focus-visible:ring-ring"}`}
                >
                  <option value="">Select category...</option>
                  <option value="Travel">Travel & Lodging</option>
                  <option value="Meals">Meals & Entertainment</option>
                  <option value="Software">Software & Subscriptions</option>
                  <option value="Office">Office Supplies</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (IDR)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-muted-foreground">
                    Rp{" "}
                  </span>
                  <Input
                    id="amount"
                    placeholder="0"
                    className={`pl-8 ${errors.amount ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    type="number"
                    step="0.01"
                    {...register("amount")}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-destructive">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionDate">Transaction Date</Label>
                <Input
                  id="transactionDate"
                  type="date"
                  {...register("transactionDate")}
                  className={
                    errors.transactionDate
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                />
                {errors.transactionDate && (
                  <p className="text-xs text-destructive">
                    {errors.transactionDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Justification</Label>
              <Textarea
                id="description"
                placeholder="Briefly explain the business purpose of this expense..."
                className={`resize-none min-h-[100px] ${errors.description ? "border-destructive focus-visible:ring-destructive" : ""}`}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Receipt Attachment</Label>
              <div
                className={`rounded-xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${errors.receipt ? "border-destructive bg-destructive/5" : isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("receipt")?.click()}
              >
                {receiptPreview ? (
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-lg overflow-hidden border border-border mb-3 relative">
                      {receiptFile?.type.includes("image") ? (
                        <img
                          src={receiptPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground uppercase">
                          {receiptFile?.name.split(".").pop() || "DOC"}
                        </div>
                      )}
                    </div>
                    <p className="font-medium text-sm line-clamp-1 max-w-[200px]">
                      {receiptFile?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <UploadCloud className="h-6 w-6 text-primary" />
                    </div>
                    {errors.receipt && (
                      <p className="text-sm text-destructive font-bold mb-2">
                        {errors.receipt.message as string}
                      </p>
                    )}
                    <h3 className="font-medium mb-1">
                      Click to upload or drag and drop
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PDF, JPG or PNG (max. 10MB)
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById("receipt")?.click();
                      }}
                    >
                      Browse Files
                    </Button>
                  </>
                )}
                <Input
                  type="file"
                  className="hidden"
                  id="receipt"
                  accept="image/png, image/jpeg, application/pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 items-center border-t border-border/50 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/user/history")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              className="gap-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-spin mr-2">⏳</span>
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-1" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
