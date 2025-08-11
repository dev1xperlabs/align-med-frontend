"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { AppSidebar } from "../sidebar/SideBar";
import { DashboardNavbar } from "../navbar/NavBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const collapsedWidth = 64;
  const defaultSidebarWidth = 280;

  const isMobile = useMediaQuery("(max-width:600px)");
  const sidebarWidth = isMobile ? collapsedWidth : defaultSidebarWidth;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [sidebarOpen]);

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <DashboardNavbar
        onMenuClick={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        sidebarWidth={sidebarWidth}
        collapsedWidth={collapsedWidth}
      />
      <AppSidebar
        open={sidebarOpen}
        onToggle={handleSidebarToggle}
        width={sidebarWidth}
        collapsedWidth={collapsedWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.default",
          minHeight: "100vh",
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
