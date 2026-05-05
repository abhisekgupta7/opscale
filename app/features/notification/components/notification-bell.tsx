"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markNotificationReadAction } from "../actions/mark-notification-read";
import { approvePaymentAction } from "@/app/features/billing/actions/approve-payment";

type NotificationItem = {
  id: string;
  orgId?: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  paymentId: string | null;
  paymentStatus: string | null;
  proofUrl: string | null;
  amount: number | null;
};

type NotificationBellProps = {
  unreadCount: number;
  notifications: NotificationItem[];
};

function formatCurrency(amountInPaisa: number | null) {
  if (amountInPaisa === null) {
    return null;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amountInPaisa / 100);
}

export default function NotificationBell({
  unreadCount,
  notifications,
}: NotificationBellProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const hasUnread = unreadCount > 0;

  const sortedNotifications = useMemo(() => notifications, [notifications]);

  const handleMarkRead = (notificationId: string) => {
    startTransition(async () => {
      const notification = notifications.find(
        (item) => item.id === notificationId,
      );
      await markNotificationReadAction(notificationId, notification?.orgId);
      router.refresh();
    });
  };

  const handleApprove = (paymentId: string, notificationId: string) => {
    startTransition(async () => {
      await approvePaymentAction(paymentId, notificationId);
      router.refresh();
    });
  };

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10"
      >
        <Bell className="h-4 w-4" />
        {hasUnread && (
          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-95 rounded-xl border border-white/10 bg-[#0f141b] p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Notifications
            </p>
            <p className="text-xs text-muted-foreground">
              Unread: {unreadCount}
            </p>
          </div>

          <div className="max-h-90 space-y-2 overflow-y-auto pr-1">
            {sortedNotifications.length === 0 && (
              <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-4 text-center text-sm text-muted-foreground">
                No notifications yet.
              </p>
            )}

            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm text-foreground">
                    {notification.message}
                  </p>
                  {!notification.isRead && (
                    <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </div>

                <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  {formatCurrency(notification.amount) && (
                    <span>• {formatCurrency(notification.amount)}</span>
                  )}
                  {notification.paymentStatus && (
                    <span>• {notification.paymentStatus}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {!notification.isRead && (
                    <Button
                      type="button"
                      onClick={() => handleMarkRead(notification.id)}
                      disabled={isPending}
                      className="h-8 border border-white/10 bg-white/5 px-2 text-xs text-foreground hover:bg-white/10"
                    >
                      Mark read
                    </Button>
                  )}

                  {notification.paymentId &&
                    notification.paymentStatus === "PENDING" && (
                      <Button
                        type="button"
                        onClick={() =>
                          handleApprove(
                            notification.paymentId!,
                            notification.id,
                          )
                        }
                        disabled={isPending}
                        className="h-8 bg-emerald-400 px-2 text-xs text-emerald-950 hover:bg-emerald-300"
                      >
                        Approve payment
                      </Button>
                    )}

                  {notification.proofUrl && (
                    <a
                      href={notification.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-8 items-center rounded-md border border-white/10 bg-white/5 px-2 text-xs text-foreground hover:bg-white/10"
                    >
                      View proof
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
