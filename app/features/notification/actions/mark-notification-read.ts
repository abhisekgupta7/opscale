"use server";

import { getActiveOrgId } from "@/app/features/auth/services/org-context.service";
import { markNotificationAsRead } from "../services/notification.service";

export async function markNotificationReadAction(notificationId: string) {
  try {
    const orgId = await getActiveOrgId();

    if (!orgId) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await markNotificationAsRead(orgId, notificationId);

    return {
      success: true,
      message: "Marked as read",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to mark notification as read",
    };
  }
}
