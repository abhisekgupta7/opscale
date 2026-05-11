import Link from "next/link";
import {
  ChevronDown,
  LayoutGrid,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import {
  getOrganizationById,
  verifyMembership,
} from "@/app/features/auth/services/membership.service";
import { isSubscriptionActive } from "@/app/features/billing/services/payment.services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDashboardNotifications } from "@/app/features/notification/actions/get-dashboard-notifications";
import NotificationBell from "@/app/features/notification/components/notification-bell";
import DashboardSignOutButton from "@/components/Utility/DashboardSignOutButton";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label:"Category", href: "/dashboard/category", icon: Package },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Ledger", href: "/dashboard/ledger", icon: Receipt },
  { label: "Payments", href: "/dashboard/payments", icon: Wallet },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session.user.activeOrgId) {
    redirect("/auth/login");
  }

  const membership = await verifyMembership(
    session.user.id,
    session.user.activeOrgId,
  );

  if (!membership) {
    redirect("/");
  }

  const organization = await getOrganizationById(session.user.activeOrgId);

  if (!organization) {
    redirect("/");
  }

  const hasActiveSubscription = await isSubscriptionActive(
    session.user.activeOrgId,
  );

  const notificationsResult = await getDashboardNotifications();

  if (!hasActiveSubscription) {
    redirect("/subscriptionPage");
  }

  return (
    <div className="dark min-h-screen bg-[#0b0f14] text-foreground">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <aside className="flex flex-col border-r border-white/10 bg-[#0c1116]/90 px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Opscale
              </p>
              <p className="text-sm font-semibold text-foreground">
                Wholesale OS
              </p>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
              Live
            </div>
          </div>

          <nav className="mt-8 flex-1 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <DashboardSignOutButton />

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Active Org
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {organization?.name || "Organization"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Role: {membership.role}
            </p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f14]/85 backdrop-blur">
            <div className="flex h-14 items-center justify-between gap-4 px-6">
              <div className="relative w-full max-w-md flex-1">
                <Input
                  placeholder="Search orders, customers, invoices"
                  className="h-9 border-white/10 bg-white/5 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <NotificationBell
                  unreadCount={notificationsResult.unreadCount}
                  notifications={notificationsResult.notifications}
                />
                <Button className="h-9 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-muted-foreground transition-colors hover:bg-white/10">
                  {organization?.name || "Organization"}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
