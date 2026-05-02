"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BILLING_CONFIG } from "@/app/config/billing";
import { submitManualPaymentAction } from "../actions/submit-manual-payment";
import ImageUploader from "@/components/Utility/ImageUploader";
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
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Complete Your Payment</h1>

      {/* QR Code */}
      <div className="flex justify-center">
        <img
          src={BILLING_CONFIG.qrImage}
          alt="Payment QR Code"
          className="w-48 h-48 rounded-lg border-2 border-gray-200"
        />
      </div>

      {/* Payment Details */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Pay to:</span>{" "}
          {BILLING_CONFIG.receiverName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Phone:</span> {BILLING_CONFIG.phone}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Amount:</span> Rs. 15,000
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-900">
          ℹ️ After making the payment, upload your transaction proof below for
          verification.
        </p>
      </div>

      {/* Image Upload Component */}
      <ImageUploader
        onUploadComplete={handleUploadComplete}
        onError={handleUploadError}
        folder="/payments"
      />

      {/* Submit Button */}
      <Button
        onClick={handleSubmitPayment}
        disabled={!proofUrl || isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? "Submitting..." : "Submit Payment Proof"}
      </Button>
    </div>
  );
}
