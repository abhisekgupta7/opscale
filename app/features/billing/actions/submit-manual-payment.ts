// features/billing/actions/submit-manual-payment.ts

"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { submitManualPayment } from "../services/payment.services";

export async function submitManualPaymentAction(proofUrl: string) {
  // ✅ Auth
  const session = await getServerSession(authOptions);
  if (!session?.user?.activeOrgId || !session?.user?.id) {
    throw new Error("No active organization found for user");
  }

  // ✅ Fixed amount (never trust frontend) - Rs. 15,000 in paisa
  const amount =15 * 100 * 1000 ;

  // ✅ Submit payment through service
  await submitManualPayment(
    session.user.activeOrgId,
    session.user.id,
    proofUrl,
    amount,
    "NPR",
  );

  return {
    success: true,
    message:
      "Payment proof submitted successfully. Our team will verify it shortly.",
  };
}
