// src\components\styled\StyledComponents.tsx
"use client";

import type React from "react";

import { styled } from "@mui/material/styles";

import {
  Card,
  TextField,
  Button,
  AppBar,
  Drawer,
  ListItemButton,
  Avatar,
  Box,
  ToggleButtonGroup,
  RadioGroup,
  Table,
  TableHead,
  TableBody,
  Select,
  FormControl,
  TableContainer,
  Chip,
  Autocomplete,
} from "@mui/material";

// =============================================================================
// CARD COMPONENTS
// =============================================================================

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
  border: "none",
  backgroundColor: "#ffffff",
}));

export const StyledLoginCard = styled(StyledCard)({
  width: "400px",
});

export const StyledSignupCard = styled(StyledCard)({
  width: "480px",
  maxWidth: "90vw",
});

export const StyledDashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "3 5px 100px rgba(0,0,0,0.08)",
  border: "none",
  overflow: "hidden",
  maxWidth: "calc(100vw - var(--sidebar-width))",
  backgroundColor: theme.palette.background.paper,
  transition: "max-width 0.3s ease",
}));

// =============================================================================
// BUTTON COMPONENTS
// =============================================================================

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 500,
  padding: "12px 24px",
  fontSize: "0.875rem",
  boxShadow: "0 2px 8px rgba(139, 195, 74, 0.3)",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(139, 195, 74, 0.4)",
  },
}));

export const StyledPrimaryButton = styled(StyledButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledLoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8bc34a",
  color: "white",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  padding: "12px 24px",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#7cb342",
    boxShadow: "none",
  },
}));

export const StyledSignupButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8bc34a",
  color: "white",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "14px 24px",
  boxShadow: "0 4px 12px rgba(139, 195, 74, 0.3)",
  "&:hover": {
    backgroundColor: "#7cb342",
    boxShadow: "0 6px 16px rgba(139, 195, 74, 0.4)",
    transform: "translateY(-1px)",
  },
  transition: "all 0.2s ease",
}));

// =============================================================================
// INPUT COMPONENTS
// =============================================================================

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StyledLoginTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    "& fieldset": {
      borderColor: "#e1e5e9",
    },
    "&:hover fieldset": {
      borderColor: "#c1c7cd",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8bc34a",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#6c757d",
    fontSize: "14px",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#8bc34a",
    },
  },
}));

export const StyledSignupTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    height: "56px",
    "& fieldset": {
      borderColor: "#e1e5e9",
      borderWidth: "1.5px",
    },
    "&:hover fieldset": {
      borderColor: "#8bc34a",
      borderWidth: "1.5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8bc34a",
      borderWidth: "2px",
      boxShadow: "0 0 0 3px rgba(139, 195, 74, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#6c757d",
    fontSize: "15px",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#8bc34a",
      fontWeight: 600,
    },
  },
  "& .MuiOutlinedInput-input": {
    fontSize: "15px",
    fontWeight: 400,
  },
}));

// =============================================================================
// DROPDOWN COMPONENTS
// =============================================================================

// Base dropdown container
export const StyledDropdownContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
}));

// Dropdown input field
export const StyledDropdownInput = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "error",
})<{ open?: boolean; error?: boolean }>(({ theme, open, error }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "56px",
  padding: "8px 14px",
  border: `1px solid ${error ? "#d32f2f" : "#e1e5e9"}`,
  borderRadius: "8px",
  backgroundColor: "#f8f9fa",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: error ? "#d32f2f" : "#c1c7cd",
    backgroundColor: "#f0f2f5",
  },
  "&:focus": {
    outline: "none",
    borderColor: error ? "#d32f2f" : "#8bc34a",
    boxShadow: `0 0 0 2px ${
      error ? "rgba(211, 47, 47, 0.1)" : "rgba(139, 195, 74, 0.1)"
    }`,
  },
  ...(open && {
    borderColor: error ? "#d32f2f" : "#8bc34a",
    boxShadow: `0 0 0 2px ${
      error ? "rgba(211, 47, 47, 0.1)" : "rgba(139, 195, 74, 0.1)"
    }`,
  }),
}));

// Dropdown menu
export const StyledDropdownMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1300,
  marginTop: "4px",
  backgroundColor: "white",
  border: "1px solid #e1e5e9",
  borderRadius: "8px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  maxHeight: "200px",
  overflow: "hidden",
}));

// Search input in dropdown
export const StyledDropdownSearch = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f8f9fa",
    "& fieldset": {
      border: "1px solid #e1e5e9",
    },
    "&:hover fieldset": {
      borderColor: "#c1c7cd",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8bc34a",
      borderWidth: "1px",
    },
  },
}));

// Dropdown option item
export const StyledDropdownOption = styled(Box, {
  shouldForwardProp: (prop) => prop !== "highlighted" && prop !== "selected",
})<{ highlighted?: boolean; selected?: boolean }>(
  ({ theme, highlighted, selected }) => ({
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    backgroundColor: highlighted ? "#f0f8e8" : "transparent",
    "&:hover": {
      backgroundColor: "#f0f8e8",
    },
    "& .MuiTypography-root": {
      fontSize: "14px",
      color: "#333",
      fontWeight: selected ? 500 : 400,
    },
  })
);

// =============================================================================
// CHIP COMPONENTS
// =============================================================================

// Selected chip in multi-select
export const StyledSelectedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#8bc34a",
  color: "white",
  fontSize: "12px",
  height: "24px",
  "& .MuiChip-deleteIcon": {
    color: "white",
    fontSize: "16px",
    "&:hover": {
      color: "#f0f0f0",
    },
  },
}));

// Display chip in tables/lists
export const StyledDisplayChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#f0f0f0",
  color: "#333",
  fontSize: "11px",
  height: "20px",
  margin: "1px",
}));

// =============================================================================
// NAVIGATION COMPONENTS
// =============================================================================

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  borderRadius: "0",
  zIndex: theme.zIndex.drawer + 1,
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.grey[50],
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
    overflowX: "hidden",
  },
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 0,
  minHeight: 48,
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

// Active state ListItemButton
export const StyledActiveListItemButton = styled(ListItemButton)(
  ({ theme }) => ({
    borderRadius: 0,
    minHeight: 48,
    backgroundColor: theme.palette.success.light + "0",
    "&:hover": {
      backgroundColor: theme.palette.success.light + "30",
    },
  })
);

// Sub-menu ListItemButton
export const StyledSubListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 0,
  minHeight: 40,
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
}));

// =============================================================================
// AVATAR COMPONENTS
// =============================================================================

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: "#666",
  fontSize: "14px",
  fontWeight: "bold",
}));

// =============================================================================
// CONTAINER COMPONENTS
// =============================================================================

export const StyledLoginBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#111c00",
  backgroundImage: `
    radial-gradient(circle at 80% 15%, #394d18 0%, rgba(57, 77, 24, 0.4) 20%, transparent 50%),
    radial-gradient(circle at 4% 100%, #394d18 0%, rgba(57, 77, 24, 0.4) 20%, transparent 50%)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}));
export const StyledMainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "component",
})<{ component?: React.ElementType }>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  transition: "margin 0.3s ease",
}));

export const StyledLogoContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  overflow: "hidden",
});

// =============================================================================
// RESPONSIVE STYLED COMPONENTS
// =============================================================================
export const ResponsiveDrawer = styled(Drawer, {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "drawerWidth" && prop !== "collapsedWidth",
})<{ open: boolean; drawerWidth: number; collapsedWidth: number }>(
  ({ theme, open, drawerWidth, collapsedWidth }) => {
    // Add these console logs

    return {
      width: open ? drawerWidth : collapsedWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: open ? drawerWidth : collapsedWidth,
        boxSizing: "border-box",
        backgroundColor: theme.palette.grey[50],
        borderRight: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 0,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: "hidden",
      },
    };
  }
);

export const ResponsiveAppBar = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "sidebarOpen" &&
    prop !== "sidebarWidth" &&
    prop !== "collapsedWidth",
})<{ sidebarOpen: boolean; sidebarWidth: number; collapsedWidth: number }>(
  ({ theme, sidebarOpen, sidebarWidth, collapsedWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    color: "transparent",
    fontWeight: 700,
    paddingTop: 8,
    marginBottom: 2,
    boxShadow: "none",
    display: "block",
    marginLeft: sidebarOpen ? `${sidebarWidth}px` : `${collapsedWidth}px`,
    width: sidebarOpen
      ? `calc(100% - ${sidebarWidth}px)`
      : `calc(100% - ${collapsedWidth}px)`,
    transition: "width 0.3s ease, margin 0.3s ease",
    borderRadius: "0",
    border: "none",
  })
);

// =============================================================================
// TOGGLE COMPONENTS - ALIGNED WITH METRICS GRID
// =============================================================================

// Container for aligned toggles
export const StyledAlignedToggleContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(3),
  width: "100%",
  margin: theme.spacing(1.5, 0),
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
}));

export const StyledGroupByToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    gridColumn: "span 2",
    width: "100%",
    "& .MuiToggleButton-root": {
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "14px",
      color: "#333",
      backgroundColor: "white",
      flex: 1,
      height: "36px",
      "&.Mui-selected": {
        backgroundColor: "#666",
        color: "white",
        "&:hover": {
          backgroundColor: "#555",
        },
      },
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&:first-of-type": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&:last-of-type": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    "@media (max-width: 900px)": {
      gridColumn: "span 2",
    },
    "@media (max-width: 600px)": {
      gridColumn: "span 1",
    },
  })
);

// Data Type Toggle (aligns with 3rd metric card)
export const StyledDataTypeToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    gridColumn: "span 1",
    width: "100%",
    "& .MuiToggleButton-root": {
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "14px",
      color: "#333",
      backgroundColor: "white",
      flex: 1,
      height: "36px",
      "&.Mui-selected": {
        backgroundColor: "#666",
        color: "white",
        "&:hover": {
          backgroundColor: "#555",
        },
      },
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&:first-of-type": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&:last-of-type": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    "@media (max-width: 900px)": {
      gridColumn: "span 1",
    },
    "@media (max-width: 600px)": {
      gridColumn: "span 1",
    },
  })
);

// View Type Toggle (ALWAYS aligns with 4th metric card - column 4)
export const StyledViewTypeToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    gridColumn: "4 / 5", // Always occupy the 4th column
    width: "100%",
    "& .MuiToggleButton-root": {
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      textTransform: "none",
      fontWeight: 600,
      fontSize: "14px",
      color: "#333",
      backgroundColor: "white",
      flex: 1,
      height: "36px",
      "&.Mui-selected": {
        backgroundColor: "#666",
        color: "white",
        "&:hover": {
          backgroundColor: "#555",
        },
      },
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&:first-of-type": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&:last-of-type": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    "@media (max-width: 900px)": {
      gridColumn: "2 / 3", // 2nd column on tablet
    },
    "@media (max-width: 600px)": {
      gridColumn: "span 1", // Full width on mobile
    },
  })
);

// Original toggle for backward compatibility
export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "& .MuiToggleButton-root": {
      border: "none",
      borderRadius:
        typeof theme.shape.borderRadius === "number"
          ? theme.shape.borderRadius / 2
          : "8px",
      padding: theme.spacing(0.75, 2),
      textTransform: "none",
      fontWeight: 500,
      fontSize: "14px",
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
      minWidth: "110px",
      "&.Mui-selected": {
        backgroundColor: theme.palette.grey[700],
        color: theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.grey[800],
        },
      },
      "&:hover": {
        backgroundColor: theme.palette.grey[300],
      },
      "&:first-of-type": {
        marginRight: "2px",
      },
    },
  })
);

export const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  "& .MuiFormControlLabel-root": {
    margin: 0,
    "& .MuiFormControlLabel-label": {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.text.secondary,
    },
  },
  "& .MuiRadio-root": {
    padding: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    "&.Mui-checked": {
      color: theme.palette.text.primary,
    },
  },
}));

export const StyledToggleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: theme.spacing(1.3, 0),
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

// =============================================================================
// TABLE COMPONENTS
// =============================================================================

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  // borderRadius: theme.shape.borderRadius,
  position: "relative",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  overflowX: "auto",
  maxWidth: "100vw",
  scrollbarWidth: "thin", // Firefox
  scrollbarColor: "#ccc transparent",

  "&::-webkit-scrollbar": {
    display: "none",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#ccc",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  maxHeight: "calc(100vw - 100px)",
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  // position: "sticky", // ✅ Make it sticky
  // top: 0, // ✅ Stick to top of container
  // zIndex: 1,
  whiteSpace: "nowrap",
  "& .MuiTableCell-head": {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    padding: theme.spacing(2),
    verticalAlign: "middle",
    // Only center text for all except the first cell
    "&:not(:first-of-type)": {
      textAlign: "center",
    },
    "&:first-of-type": {
      textAlign: "left",
      position: "sticky", // Sticky positioning
      left: 0, // Stick to the left
      zIndex: 1,
    },
  },
}));

export const StyledTableBody = styled(TableBody)(({ theme }) => ({
  "& .MuiTableRow-root": {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey[100], // Light grey for odd rows
    },
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper, // Keep white for even if you want
    },
    "&:hover": {
      backgroundColor: theme.palette.grey[200], // Slightly darker grey on hover
    },
  },

  "& .MuiTableCell-body": {
    fontSize: "14px",
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",

    "&:not(:first-of-type)": {
      textAlign: "center",
    },

    "&:first-of-type": {
      textAlign: "left",
      position: "sticky",
      left: 0,
      zIndex: 1,
      backgroundColor: "inherit",
    },
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  height: 40,
  fontSize: "14px",
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.paper,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[300],
    borderRadius:
      typeof theme.shape.borderRadius === "number"
        ? theme.shape.borderRadius / 2
        : "4px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  [theme.breakpoints.down("md")]: {
    width: 300,
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    width: 200,
    fontSize: "12px",
  },
  [theme.breakpoints.down("xs")]: {
    width: 150,
    fontSize: "11px",
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 180,
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  minWidth: 180,
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
  },
  "& .MuiOutlinedInput-root": {
    padding: "4px",
    fontSize: "14px",
  },
}));

export const StyledTableControls = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export const StyledControlsLeft = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const StyledControlsRight = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));
