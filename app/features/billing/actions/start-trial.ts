// features/billing/actions/start-trial.ts

"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { startTrial } from "../services/payment.services";

export async function startTrialAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.activeOrgId) {
    throw new Error("No active organization found for user");
  }

  await startTrial(session.user.activeOrgId);

  return { success: true, message: "Trial started successfully" };
}
