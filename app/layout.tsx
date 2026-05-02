import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import Footer from "@/components/Utility/Footer";
import { Toaster } from "@/components/ui/sonner";

const dmsans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpScale - Business Automation Platform",
  description:
    "Transform your wholesale business with OpScale's complete automation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmsans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-linear-to-br from-white via-blue-50/30 to-slate-50">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
