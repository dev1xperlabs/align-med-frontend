"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { iUser } from "@/app/login/interfaces/iUserInterface";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<iUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      console.log("useAuth: Checking authentication status...");
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("user");

      console.log("useAuth: Token exists:", !!token);
      console.log("useAuth: User data exists:", !!userData);

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log("useAuth: Parsed user:", parsedUser);

          // Create display name from first_name and last_name
          const userWithName = {
            ...parsedUser,
            name: `${parsedUser.first_name || ""} ${
              parsedUser.last_name || ""
            }`.trim(),
          };

          setUser(userWithName);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("useAuth: Error parsing user data:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log("useAuth: No valid authentication found");
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    (accessToken: string, userData: iUser) => {
      console.log("useAuth: Login called with:", {
        accessToken: !!accessToken,
        userData,
      });

      // Store the accessToken as authToken for consistency with existing code
      localStorage.setItem("authToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userData));

      const userWithName = {
        ...userData,
        name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
      };

      setUser(userWithName);
      setIsAuthenticated(true);

      console.log("useAuth: Login successful, redirecting to dashboard...");

      setTimeout(() => {
        router.push("/patient-intake");
      }, 100);
    },
    [router]
  );

  const logout = useCallback(() => {
    console.log("useAuth: Logout called");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    getToken,
  };
}
