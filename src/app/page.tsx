"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Let AuthGuard handle the routing logic
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/patient-intake");
    } else {
      router.replace("/login");
    }
  }, [router]);

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
