// features/billing/actions/submit-manual-payment.ts

"use server";

import { getActiveOrgContext } from "@/app/features/auth/services/org-context.service";
import { submitManualPayment } from "../services/payment.services";

export async function submitManualPaymentAction(proofUrl: string) {
  try {
    // ✅ Auth
    const context = await getActiveOrgContext();
    if (!context) {
      return {
        success: false,
        message: "No active organization found. Please log in first.",
      };
    }

    if (!proofUrl) {
      return {
        success: false,
        message: "Please upload payment proof first.",
      };
    }

    // ✅ Fixed amount (never trust frontend) - Rs. 15,000 in paisa
    const amount = 15 * 100 * 1000;

    // ✅ Submit payment through service
    await submitManualPayment(
      context.orgId,
      context.userId,
      proofUrl,
      amount,
      "NPR",
    );

    return {
      success: true,
      message:
        "Payment proof submitted successfully. Our team will verify it shortly.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit payment";
    return {
      success: false,
      message,
    };
  }
}
