// features/billing/actions/start-trial.ts

"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { startTrial } from "../services/payment.services";

export async function startTrialAction() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.activeOrgId) {
      return {
        success: false,
        message: "No active organization found. Please log in first.",
      };
    }

    await startTrial(session.user.activeOrgId);

    return { success: true, message: "Trial started successfully! 🎉" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start trial";
    return { success: false, message };
  }
}
