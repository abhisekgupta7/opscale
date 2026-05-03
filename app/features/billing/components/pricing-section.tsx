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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* LEFT: FREE TRIAL */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-blue-700">PRO TRIAL</p>
          <h2 className="text-xl font-semibold text-slate-900">
            Start Free Trial
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          Try all PRO features free for 7 days.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>✔ Product management</li>
          <li>✔ Order tracking</li>
          <li>✔ Reports & analytics</li>
        </ul>

        <Button
          onClick={handleStartTrial}
          disabled={isLoading}
          className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLoading ? "Starting Trial..." : "Start Free Trial"}
        </Button>
      </div>

      {/* RIGHT: CONTACT SALES */}
      <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-blue-700">CUSTOM PLAN</p>
          <h2 className="text-xl font-semibold text-slate-900">
            Contact Sales
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          Get custom pricing and pay manually via QR.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>✔ Dedicated support</li>
          <li>✔ Flexible pricing</li>
          <li>✔ Bulk business onboarding</li>
        </ul>

        <Link href="/billingManual" className="w-full">
          <Button
            variant="outline"
            className="mt-6 w-full border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Contact Sales
          </Button>
        </Link>
      </div>
    </div>
  );
}
