import type React from "react";
// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Align Med - Dashboard",
  description: "Medical practice management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
