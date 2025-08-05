"use client";

import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MUIThemeProvider from "./ThemeProvider";
import { AuthGuard } from "./auth/AuthGuard";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MUIThemeProvider>
        <AuthGuard>{children}</AuthGuard>
      </MUIThemeProvider>
    </QueryClientProvider>
  );
}
