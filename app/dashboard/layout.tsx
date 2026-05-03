import Link from "next/link";
import {
  Bell,
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

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Products", href: "/dashboard/products", icon: Package },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Ledger", href: "/dashboard/ledger", icon: Receipt },
  { label: "Payments", href: "/dashboard/payments", icon: Wallet },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Active Org
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              Sapphire Foods Pvt Ltd
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              12 team members
            </p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f14]/85 backdrop-blur">
            <div className="flex h-14 items-center gap-4 px-6">
              <div className="relative w-full max-w-md">
                <Input
                  placeholder="Search orders, customers, invoices"
                  className="h-9 border-white/10 bg-white/5 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  className="h-9 bg-emerald-400 text-emerald-950 hover:bg-emerald-300"
                >
                  <Link href="/dashboard/orders/create">Create order</Link>
                </Button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-white/10">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-foreground">
                    AG
                  </span>
                  Admin Gupta
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-6 py-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
