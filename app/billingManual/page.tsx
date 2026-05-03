"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QrCode, ShieldCheck, UploadCloud } from "lucide-react";
import { BILLING_CONFIG } from "@/app/config/billing";
import { submitManualPaymentAction } from "../features/billing/actions/submit-manual-payment";
import ImageUploader from "@/components/Utility/ImageUploader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ManualBillingPage() {
  const [proofUrl, setProofUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadComplete = (url: string) => {
    setProofUrl(url);
    toast.success("Proof image uploaded successfully");
  };

  const handleUploadError = () => {
    toast.error("Failed to upload proof image");
  };

  const handleSubmitPayment = async () => {
    if (!proofUrl) {
      toast.error("Please upload payment proof first");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitManualPaymentAction(proofUrl);
      if (result.success) {
        toast.success("Payment submitted for verification");
        setProofUrl("");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit payment";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-[#0b0f14] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full space-y-6 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Payment link
              </p>
              <h1 className="text-2xl font-semibold text-foreground">
                Complete your payment
              </h1>
              <p className="text-sm text-muted-foreground">
                Secure your subscription by submitting a verified payment proof.
              </p>
            </div>
            <Badge className="border-emerald-400/40 bg-emerald-400/10 text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure checkout
            </Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-xl border border-white/10 bg-[#0f141b] p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <QrCode className="h-4 w-4" />
                Scan to pay via UPI / QR
              </div>
              <div className="mt-4 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6">
                <img
                  src={BILLING_CONFIG.qrImage}
                  alt="Payment QR Code"
                  className="h-48 w-48 rounded-xl bg-white p-2"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Amount due</span>
                <span className="text-sm font-semibold text-foreground">
                  Rs. 15,000
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-[#0f141b] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    Billing details
                  </p>
                  <Badge
                    variant="outline"
                    className="border-amber-400/40 bg-amber-400/10 text-amber-300"
                  >
                    Pending verification
                  </Badge>
                </div>
                <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Pay to</span>
                    <span className="font-medium text-foreground">
                      {BILLING_CONFIG.receiverName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone</span>
                    <span className="font-medium text-foreground">
                      {BILLING_CONFIG.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reference</span>
                    <span className="font-medium text-foreground">UPI</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <UploadCloud className="h-4 w-4" />
                  Upload proof
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  After payment, upload the transaction proof for verification.
                </p>
                <ul className="mt-3 space-y-1 text-xs">
                  <li>Accepted: PNG, JPG, WebP up to 5MB.</li>
                  <li>Verification typically completes within 2 hours.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <ImageUploader
              onUploadComplete={handleUploadComplete}
              onError={handleUploadError}
              folder="/payments"
              label="Upload payment proof"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="text-xs text-muted-foreground">
              Processing is secure and encrypted. You will be notified once the
              payment is verified.
            </div>
            <Button
              onClick={handleSubmitPayment}
              disabled={!proofUrl || isSubmitting}
              className="h-10 bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
            >
              {isSubmitting ? "Submitting..." : "Submit payment proof"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
