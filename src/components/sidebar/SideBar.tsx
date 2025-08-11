"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  People as PeopleIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  ResponsiveDrawer,
  StyledListItemButton,
  StyledActiveListItemButton,
  StyledSubListItemButton,
} from "../styled";
import { AlignLogo } from "../common/LogoComponent";
import { navigationData } from "@/constants/navigationData";
import { useAuth } from "../auth/useAuth";
export function AppSidebar({
  open,
  onToggle,
  width,
  collapsedWidth = 64,
}: iAppSidebarProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleExpandClick = (title: string) => {
    if (open) {
      setExpandedItems((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    }
  };

  const { user } = useAuth();

  console.log("Sidebar - user role:", user);

  const isActiveItem = (item: iNavigationItem) => {
    if (pathname === "/" || pathname === "/patient-intake") {
      return item.url === "/patient-intake";
    }
    return item.items
      ? item.items.some((subItem) => pathname === subItem.url) ||
          pathname.startsWith(item.url)
      : pathname === item.url || pathname.startsWith(item.url);
  };

  const isActiveSubItem = (subItemUrl: string) => pathname === subItemUrl;

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    navigationData.forEach((item) => {
      if (item.items?.some((subItem) => pathname === subItem.url)) {
        setExpandedItems((prev) =>
          prev.includes(item.title) ? prev : [...prev, item.title]
        );
      }
    });
  }, [pathname]);

  const renderMainItem = (item: iNavigationItem) => {
    const isActive = isActiveItem(item);
    const ButtonComponent = isActive
      ? StyledActiveListItemButton
      : StyledListItemButton;
    const iconColor = isActive
      ? theme.palette.primary.main
      : theme.palette.text.secondary;
    const textColor = isActive
      ? theme.palette.primary.main
      : theme.palette.text.primary;

    return (
      <ButtonComponent
        onClick={() =>
          item.items
            ? handleExpandClick(item.title)
            : handleNavigation(item.url)
        }
        sx={{
          mx: open ? 1 : 0.5,
          justifyContent: open ? "initial" : "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <item.icon sx={{ color: iconColor, fontSize: "20px" }} />
        </ListItemIcon>
        {open && (
          <>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: "1rem",
                fontWeight: isActive ? 700 : 500,
                color: textColor,
                fontFamily: theme.typography.fontFamily,
              }}
            />
            {item.items &&
              (expandedItems.includes(item.title) ? (
                <ExpandLess sx={{ color: iconColor }} />
              ) : (
                <ExpandMore sx={{ color: iconColor }} />
              ))}
          </>
        )}
      </ButtonComponent>
    );
  };

  const renderSubItems = (item: iNavigationItem) =>
    item.items &&
    open && (
      <Collapse
        in={expandedItems.includes(item.title)}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {item.items.map((subItem) => {
            const isActive = isActiveSubItem(subItem.url);
            return (
              <ListItem key={subItem.title} disablePadding>
                <StyledSubListItemButton
                  sx={{
                    pl: 2,
                    paddingLeft: open ? 5 : 1,
                    mx: 1,
                    backgroundColor: isActive ? "#f0f8e8" : "transparent",
                    "&:hover": {
                      backgroundColor: isActive
                        ? "#e8f5c8"
                        : theme.palette.grey[100],
                    },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 16,
                      right: 16,
                      height: "1px",
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                  onClick={() => handleNavigation(subItem.url)}
                >
                  {subItem.icon && (
                    <ListItemIcon
                      sx={{ minWidth: 0, mr: 2, justifyContent: "center" }}
                    >
                      <subItem.icon
                        sx={{
                          color: isActive
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                          fontSize: "20px",
                        }}
                      />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={subItem.title}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                      fontWeight: isActive ? 600 : 400,
                      fontFamily: theme.typography.fontFamily,
                    }}
                  />
                </StyledSubListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    );

  return (
    <ResponsiveDrawer
      variant="permanent"
      open={open}
      drawerWidth={width}
      collapsedWidth={collapsedWidth}
    >
      <Box
        sx={{
          p: open ? 3 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: open ? 100 : 64,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flex: 1, mr: 1 }}>
          <AlignLogo collapsed={!open} />
        </Box>
      </Box>

      <List sx={{ pt: 2, px: open ? 1 : 0.5 }}>
        {navigationData
          .filter((item) => {
            if (item.title === "User Management") {
              return user?.role_id === 1;
            }
            return true;
          })
          .map((item) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                {renderMainItem(item)}
              </ListItem>
              {renderSubItems(item)}
            </React.Fragment>
          ))}
      </List>
    </ResponsiveDrawer>
  );
}
