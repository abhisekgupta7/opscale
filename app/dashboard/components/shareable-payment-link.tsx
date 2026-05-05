"use client";

import { useState } from "react";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ShareablePaymentLink({
  organizationId,
}: {
  organizationId: string;
}) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const paymentUrl = `${baseUrl}/pay/${organizationId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-foreground">
            Customer Payment Link
          </h3>
          <Badge className="bg-blue-600 dark:bg-blue-500 text-white">
            Shareable
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Share this link with your customers to receive payments. They'll be
          able to upload proof and you'll verify it.
        </p>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
            Organization ID
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800 font-mono text-sm text-foreground break-all">
            {organizationId}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em]">
            Payment URL
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={paymentUrl}
              readOnly
              className="flex-1 p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800 font-mono text-sm text-foreground"
            />
            <Button
              onClick={handleCopy}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              size="sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg border border-blue-100 dark:border-blue-900">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 <strong>Tip:</strong> Share this link via email, WhatsApp, or
            SMS. Customers can upload their payment proof directly without
            creating an account.
          </p>
        </div>
      </div>
    </Card>
  );
}
