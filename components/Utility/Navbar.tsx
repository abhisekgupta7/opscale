import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="OpScale Logo"
            width={160}
            height={48}
            className="h-9 w-auto"
            priority
          />
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            OpScale
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="#platform"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Platform
          </Link>
          <Link
            href="#workflow"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Workflow
          </Link>
          <Link
            href="#pricing"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 sm:inline-flex"
          >
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="hidden bg-emerald-400 text-emerald-950 hover:bg-emerald-300 sm:inline-flex"
          >
            <Link href="/auth/signup">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
