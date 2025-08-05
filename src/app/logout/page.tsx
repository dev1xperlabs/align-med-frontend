"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/auth/useAuth";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    // Automatically logout when this page is accessed
    logout();
  }, [logout]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        gap: 2,
      }}
    >
      <CircularProgress size={40} sx={{ color: "#8BC34A" }} />
      <Typography variant="body1" color="text.secondary">
        Logging you out...
      </Typography>
    </Box>
  );
}
