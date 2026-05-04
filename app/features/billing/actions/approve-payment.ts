"use server";

import { getActiveOrgContext } from "@/app/features/auth/services/org-context.service";
import {
  activateSubscriptionAfterPayment,
  getPayment,
  updatePaymentStatus,
} from "../services/payment.services";
import { createNotification } from "@/app/features/notification/services/notification.service";
import { markNotificationAsRead } from "@/app/features/notification/services/notification.service";

export async function approvePaymentAction(
  paymentId: string,
  notificationId?: string,
) {
  try {
    const context = await getActiveOrgContext();

    if (!context) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (context.role !== "OWNER" && context.role !== "ADMIN") {
      return {
        success: false,
        message: "Only admins can approve payments",
      };
    }

    const payment = await getPayment(paymentId);
    if (!payment || payment.organizationId !== context.orgId) {
      return {
        success: false,
        message: "Payment not found for this organization",
      };
    }

    if (payment.status !== "PENDING") {
      return {
        success: false,
        message: `Payment is already ${payment.status.toLowerCase()}`,
      };
    }

    await updatePaymentStatus(paymentId, "VERIFIED");
    await activateSubscriptionAfterPayment(context.orgId);

    if (notificationId) {
      await markNotificationAsRead(context.orgId, notificationId);
    }

    await createNotification(
      context.orgId,
      "PAYMENT_VERIFIED",
      `Manual payment has been approved successfully. PAYMENT_ID:${paymentId}`,
    );

    return {
      success: true,
      message: "Payment approved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to approve payment",
    };
  }
}
