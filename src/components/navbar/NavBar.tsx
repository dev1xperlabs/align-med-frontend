"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { ResponsiveAppBar, StyledAvatar } from "../styled";
import { MuiRouteDisplay } from "../common/route-display-mui";
import { useAuth } from "../auth/useAuth";
import Swal from "sweetalert2";
import { useUserData } from "@/hooks/use-user-data";

export function DashboardNavbar({
  onMenuClick,
  sidebarOpen,
  sidebarWidth = 334,
  collapsedWidth = 64,
}: iDashboardNavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const { user, isLoading } = useUserData();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  // useEffect(() => {
  //   console.log(user, "useUserData in DashboardNavbar");
  // }, [user]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: theme.palette.primary.main,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        icon: "success",
        confirmButtonColor: theme.palette.primary.main,
        timer: 1500,
        timerProgressBar: true,
      });
    }
    handleClose();
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U";
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return `${first}${last}`;
  };

  const getDisplayName = () => {
    if (user?.name) return user.name;
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ""} ${user.last_name || ""}`.trim();
    }
    return "User";
  };

  return (
    <ResponsiveAppBar
      position="fixed"
      sidebarOpen={sidebarOpen}
      sidebarWidth={sidebarWidth}
      collapsedWidth={collapsedWidth}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            justifyContent: "start",
            alignItems: "center",
            display: "flex",
          }}
        >
          <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <MuiRouteDisplay
            variant="h6"
            component="h1"
            sx={{
              fontWeight: 600,
              color: "grey.800",
              fontSize: "1.25rem",
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <StyledAvatar>
              {getInitials(user?.first_name, user?.last_name)}
            </StyledAvatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ mt: 1 }}
          >
            <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {getDisplayName()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email || "No email available"}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: "#d32f2f" }}>
              <Logout sx={{ mr: 1, fontSize: 20 }} />
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </ResponsiveAppBar>
  );
}
