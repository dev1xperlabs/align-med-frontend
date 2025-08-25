import type { SxProps, Theme } from "@mui/material/styles"

export const tableStyles = {
  // Table container styles
  container: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
  } as SxProps<Theme>,

  // Controls section
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: 2,
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
    gap: 2,
    flexWrap: "wrap",
  } as SxProps<Theme>,

  controlsLeft: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  } as SxProps<Theme>,

  controlsRight: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  } as SxProps<Theme>,

  // Filter styles
  filterContainer: {
    minWidth: 100,
  } as SxProps<Theme>,

  filterFormControl: {
    minWidth: 100,
    width: "100%",
  } as SxProps<Theme>,

  filterSelect: {
    // width: {
    //   xs: "100%",
    //   sm: 200,
    //   md: 200,
    //   lg: 200,
    //   xl: 400,
    // },
    width: 200,
    minHeight: 40,
    fontSize: 14,
    alignItems: "center",
    "& .MuiInputLabel-root": {
      top: "-7px",
    },
  } as SxProps<Theme>,

  // Autocomplete styles
  autocomplete: {
    // width: {
    //   xs: "100%",
    //   sm: 200,
    //   md: 200,
    //   lg: 200,
    //   xl: 400,
    // },
    width: 330,
    mb: 1,
    mt: "8px",
    "& .MuiInputBase-root": {
      minHeight: 40,
      fontSize: 14,
      alignItems: "center",
    },
    "& .MuiInputLabel-root": {
      top: "-7px",
    },
  } as SxProps<Theme>,

  // Chip styles
  chip: {
    height: 20,
    fontSize: "0.75rem",
    backgroundColor: "#8BC34A",
    color: "white",
    "& .MuiChip-deleteIcon": {
      color: "white",
      fontSize: "14px",
      "&:hover": {
        color: "#f0f0f0",
      },
    },
  } as SxProps<Theme>,

  // No data styles
  noDataCell: {
    textAlign: "center",
    py: 4,
  } as SxProps<Theme>,

  noDataTitle: {
    mb: 1,
  } as SxProps<Theme>,

  // Pagination styles
  pagination: {
    borderTop: (theme: Theme) => `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: (theme: Theme) => theme.palette.background.paper,
  } as SxProps<Theme>,
}
