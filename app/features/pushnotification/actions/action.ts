"use server";

import { db } from "@/lib/db/client";
import { pushSubscriptionsTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import webpush from "web-push";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

webpush.setVapidDetails(
  "mailto:abhisekgupta.dev@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function sendNotification(message: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.activeOrgId) {
    throw new Error("Unauthorized");
  }

  try {
    const [subscription] = await db
      .select()
      .from(pushSubscriptionsTable)
      .where(
        and(
          eq(pushSubscriptionsTable.userId, session.user.id),
          eq(pushSubscriptionsTable.organizationId, session.user.activeOrgId),
        ),
      )
      .limit(1);

    if (!subscription) {
      throw new Error("No subscription available");
    }

    await webpush.sendNotification(
      subscription as Parameters<typeof webpush.sendNotification>[0],
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
