import type { SxProps, Theme } from "@mui/material/styles"

export const chartStyles = {
  container: {
    height: 400,
    width: "100%",
    position: "relative",
    overflow: "hidden",
  } as SxProps<Theme>,

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    width: "100%",
  } as SxProps<Theme>,

  noDataContainer: {
    textAlign: "center",
    py: 8,
  } as SxProps<Theme>,

  noDataTitle: {
    mb: 1,
  } as SxProps<Theme>,

  chartWrapper: {
    p: 2,
  } as SxProps<Theme>,
}
