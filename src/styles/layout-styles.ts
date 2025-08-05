import type { SxProps, Theme } from "@mui/material/styles"

export const layoutStyles = {
  // Page container
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  } as SxProps<Theme>,

  // Metrics grid
  metricsGrid: {
    mb: 2,
  } as SxProps<Theme>,

  // Error/Warning boxes
  errorBox: {
    mb: 2,
    p: 2,
    bgcolor: "error.light",
    color: "error.dark",
    borderRadius: 1,
  } as SxProps<Theme>,

  warningBox: {
    mb: 2,
    p: 2,
    bgcolor: "warning.light",
    color: "warning.dark",
    borderRadius: 1,
  } as SxProps<Theme>,

  // Card styles
  dashboardCard: {
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    border: "none",
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
  } as SxProps<Theme>,

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    borderBottom: "1px solid #e0e0e0",
  } as SxProps<Theme>,

  cardContent: {
    p: 3,
  } as SxProps<Theme>,
}
