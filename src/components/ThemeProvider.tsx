// src\components\ThemeProvider.tsx
"use client";

import type React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8BC34A",
      light: "#AED581",
      dark: "#689F38",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4CAF50",
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f1f1f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#545454",
      secondary: "#666666",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    success: {
      main: "#8BC34A",
      light: "#AED581",
      dark: "#689F38",
    },
    info: {
      main: "#2E5D31",
      light: "#4CAF50",
      dark: "#1B5E20",
    },
  },
  typography: {
    fontFamily: '"Manrope", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontFamily: '"Manrope", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          borderRadius: "12px",
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          padding: "12px 24px",
          fontSize: "0.875rem",
        },
        contained: {
          boxShadow: "0 2px 8px rgba(139, 195, 74, 0.3)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(139, 195, 74, 0.4)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#8BC34A",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8BC34A",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f5f5f5",
            fontWeight: 600,
            color: "#666666",
            fontSize: "0.875rem",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#fafafa",
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          margin: "2px 8px",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          "&.Mui-selected": {
            backgroundColor: "#f0f8e8",
            "&:hover": {
              backgroundColor: "#e8f5c8",
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#333333",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
        },
        filled: {
          backgroundColor: "#333333",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#424242",
          },
        },
      },
    },
  },
});

export default function MUIThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
