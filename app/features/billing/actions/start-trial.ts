// features/billing/actions/start-trial.ts

"use server";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { startTrial } from "../services/payment.services";

export async function startTrialAction() {
  try {
    const organizationId = await getActiveOrgId();
    if (!organizationId) {
      return {
        success: false,
        message: "No active organization found. Please log in first.",
      };
    }

    await startTrial(organizationId);

    return { success: true, message: "Trial started successfully! 🎉" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start trial";
    return { success: false, message };
  }
}
