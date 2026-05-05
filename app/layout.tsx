import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import LayoutWrapper from "@/components/Utility/LayoutWrapper";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
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
      data-scroll-behavior="smooth"
      className={`${manrope.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-linear-to-b from-background via-background to-muted/30">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
