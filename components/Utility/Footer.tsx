import Link from "next/link";
import {  Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100/30 bg-linear-to-b from-slate-50 to-blue-50/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold text-lg">⚙</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  OpScale
                </span>
                <span className="text-xs text-slate-500 -mt-1">Automation</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Enterprise automation platform helping wholesalers transform their
              business operations with intelligent solutions.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#services"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#contacts"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                >
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-blue-100/30 pt-8 sm:flex-row">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} OpScale. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-slate-600 transition-colors hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <span className="sr-only">Twitter</span>
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-slate-600 transition-colors hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/20"
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
