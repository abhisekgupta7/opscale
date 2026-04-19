import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-neutral-700 to-neutral-900 shadow-lg ring-1 ring-neutral-800 transition-all group-hover:ring-neutral-600"></div>
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center space-x-1 md:flex">
          <Link
            href="#services"
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-neutral-900/50 hover:text-neutral-100"
          >
            Services
          </Link>
          <Link
            href="#pricing"
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-neutral-900/50 hover:text-neutral-100"
          >
            Pricing
          </Link>
          <Link
            href="#contacts"
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-neutral-900/50 hover:text-neutral-100"
          >
            Contact
          </Link>
          <Link
            href="#faq"
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-400 transition-all hover:bg-neutral-900/50 hover:text-neutral-100"
          >
            FAQ
          </Link>
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-3">
          <Link href="/auth/signup">
            <Button className="hidden rounded-lg border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-700 hover:bg-neutral-900/50 sm:block">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button className="hidden rounded-lg border border-neutral-800 px-4 py-2 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-700 hover:bg-neutral-900/50 sm:block">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
