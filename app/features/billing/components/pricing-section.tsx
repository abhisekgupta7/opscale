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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-emerald-300">PRO TRIAL</p>
          <h2 className="text-xl font-semibold text-slate-100">
            Start Free Trial
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          Try all PRO features free for 7 days.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>✔ Inventory management</li>
          <li>✔ Order tracking</li>
          <li>✔ Khata system (payment recovery automation)</li>
          <li>✔ Digital ledger</li>
        </ul>

        <Button
          onClick={handleStartTrial}
          disabled={isLoading}
          className="mt-6 w-full bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
        >
          {isLoading ? "Starting Trial..." : "Start Free Trial"}
        </Button>
      </div>

      {/* RIGHT: ENTERPRISE PLAN */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-emerald-300">ENTERPRISE</p>
          <h2 className="text-xl font-semibold text-slate-100">
            Wholesale Scale Plan
          </h2>
        </div>

        <p className="mt-2 text-sm text-slate-400">
          For large teams with advanced automation needs.
        </p>

        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          <li>✔ Multi-branch management</li>
          <li>✔ Advanced payment recovery automation</li>
          <li>✔ Custom khata workflows</li>
          <li>✔ API integrations & webhooks</li>
        </ul>

        <Link href="/billing/manual" className="w-full">
          <Button className="mt-6 w-full border-emerald-400 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 border">
            Request Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}
