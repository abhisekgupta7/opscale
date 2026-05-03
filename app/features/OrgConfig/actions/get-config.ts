"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getOrganizationConfigByOrg } from "../service/config.services";

export async function getOrganizationConfigAction() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.activeOrgId) {
      return {
        success: false,
        message: "No active organization found. Please log in first.",
        data: null,
      };
    }

    const config = await getOrganizationConfigByOrg(session.user.activeOrgId);

    return {
      success: true,
      data: config,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch organization config";
    return {
      success: false,
      message,
      data: null,
    };
  }
}
