import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";
import LayoutWrapper from "@/components/Utility/LayoutWrapper";
import { COMPANY_CONFIG } from "./config/company";
import { getSiteUrl } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpScale",
    template: "%s | OpScale",
  },
  description: COMPANY_CONFIG.description,
  applicationName: COMPANY_CONFIG.name,
  keywords: [
    "wholesale operations software",
    "inventory management",
    "order management",
    "ledger system",
    "khata system",
    "payment verification",
    "wholesale automation",
    "billing software",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: COMPANY_CONFIG.name,
    title: "OpScale",
    description: COMPANY_CONFIG.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpScale wholesale operations platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpScale",
    description: COMPANY_CONFIG.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
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
