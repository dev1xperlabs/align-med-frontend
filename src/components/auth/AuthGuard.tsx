"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const checkAuth = () => {
      console.log("AuthGuard: Checking authentication...");
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("user");

      console.log("AuthGuard: Token exists:", !!token);
      console.log("AuthGuard: User exists:", !!user);
      console.log("AuthGuard: Current pathname:", pathname);
      console.log("AuthGuard: Is public route:", isPublicRoute);

      const authenticated = !!(token && user);
      setIsAuthenticated(authenticated);

      if (authenticated && isPublicRoute) {
        console.log(
          "AuthGuard: User is authenticated, redirecting to dashboard..."
        );
        router.replace("/patient-intake");
      } else if (!authenticated && !isPublicRoute) {
        console.log(
          "AuthGuard: User is not authenticated, redirecting to login..."
        );
        router.replace("/login");
      } else {
        console.log("AuthGuard: No redirect needed");
      }

      setIsLoading(false);
    };

    // Add a small delay to ensure localStorage is ready
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [pathname, router, isPublicRoute]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <CircularProgress size={40} sx={{ color: "#8BC34A" }} />
      </Box>
    );
  }

  // For public routes, always show the content
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes, only show content if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This should not be reached due to the redirect logic above
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <CircularProgress size={40} sx={{ color: "#8BC34A" }} />
    </Box>
  );
}
