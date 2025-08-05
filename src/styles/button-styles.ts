import type { SxProps, Theme } from "@mui/material/styles"

export const buttonStyles = {
  // Primary button
  primary: {
    backgroundColor: "#8BC34A",
    "&:hover": { backgroundColor: "#7CB342" },
    "&:disabled": { backgroundColor: "#ccc" },
    minWidth: "150px",
    height: "56px",
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: 500,
  } as SxProps<Theme>,

  // Secondary button
  secondary: {
    color: "white",
    backgroundColor: "#666",
    "&:hover": { backgroundColor: "#555" },
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: 500,
  } as SxProps<Theme>,

  // Icon button
  icon: {
    size: "small",
    color: "#666",
  } as SxProps<Theme>,

  // Delete button
  delete: {
    size: "small",
    color: "#d32f2f",
  } as SxProps<Theme>,
}
