import Link from "next/link";
import { Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0f14]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <span className="text-sm font-semibold text-slate-100">OS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-slate-100">
                  OpScale
                </span>
                <span className="-mt-0.5 text-xs text-slate-500">
                  Wholesale OS
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A focused operating system for wholesale teams: orders, inventory,
              receivables, and payments in one clean workspace.
            </p>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
              Status: All systems operational.
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#platform"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Product suite
                </Link>
              </li>
              <li>
                <Link
                  href="#workflow"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Workflow
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-400 transition-colors hover:text-slate-100"
                >
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} OpScale. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
            >
              <span className="sr-only">Twitter</span>
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="rounded-md p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
            >
              <span className="sr-only">LinkedIn</span>
              <Share2 className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
