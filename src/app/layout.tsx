import type React from "react";
// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick={false}
          closeButton={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
