import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-100/20 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo - Only the picture, horizontal */}
        <Link
          href="/"
          className="group flex items-center transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="OpScale Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center space-x-2 md:flex">
          <Link
            href="#services"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-blue-600 hover:bg-blue-50/50"
          >
            Services
          </Link>
          <Link
            href="#pricing"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-blue-600 hover:bg-blue-50/50"
          >
            Pricing
          </Link>
          <Link
            href="#contacts"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-blue-600 hover:bg-blue-50/50"
          >
            Contact
          </Link>
          <Link
            href="#faq"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:text-blue-600 hover:bg-blue-50/50"
          >
            FAQ
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Link href="/auth/login">
            <Button className="hidden rounded-lg border-2 border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 sm:block">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="hidden rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-blue-700 hover:to-blue-800 sm:block">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
