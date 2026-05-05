"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardSignOutButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      className="mt-6 h-10 w-full justify-start border border-white/10 bg-white/5 px-3 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </Button>
  );
}
