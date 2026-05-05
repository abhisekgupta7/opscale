import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpScale Admin - Platform Control",
  description: "OpScale Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
