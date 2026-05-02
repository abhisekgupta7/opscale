// features/billing/components/pricing-section.tsx

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { startTrialAction } from "../actions/start-trial";
import { useState } from "react";
import { toast } from "sonner";

export function PricingSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTrial = async () => {
    setIsLoading(true);
    try {
      const result = await startTrialAction();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to start trial";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT: FREE TRIAL */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Start Free Trial</h2>

        <p className="text-sm text-muted-foreground mt-2">
          Try all PRO features free for 7 days.
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li>✔ Product management</li>
          <li>✔ Order tracking</li>
          <li>✔ Reports & analytics</li>
        </ul>

        <Button
          onClick={handleStartTrial}
          disabled={isLoading}
          className="mt-6 w-full"
        >
          {isLoading ? "Starting Trial..." : "Start Free Trial"}
        </Button>
      </div>

      {/* RIGHT: CONTACT SALES */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold">Contact Sales</h2>

        <p className="text-sm text-muted-foreground mt-2">
          Get custom pricing and pay manually via QR.
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li>✔ Dedicated support</li>
          <li>✔ Flexible pricing</li>
          <li>✔ Bulk business onboarding</li>
        </ul>

        <Link href="/billing/manual" className="w-full">
          <Button variant="outline" className="mt-6 w-full">
            Contact Sales
          </Button>
        </Link>
      </div>
    </div>
  );
}
