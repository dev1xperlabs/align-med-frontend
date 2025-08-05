import type { SxProps, Theme } from "@mui/material/styles"

export const dialogStyles = {
  // Dialog paper
  dialogPaper: {
    borderRadius: "12px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    width: "420px",
    maxWidth: "420px",
  } as SxProps<Theme>,

  // Dialog title
  dialogTitle: {
    fontSize: "18px",
    fontWeight: 600,
    pb: 2,
    textAlign: "center",
    borderBottom: "1px solid #f0f0f0",
  } as SxProps<Theme>,

  // Dialog content
  dialogContent: {
    pt: 3,
    pb: 2,
  } as SxProps<Theme>,

  // Dialog actions
  dialogActions: {
    p: 3,
    pt: 2,
    justifyContent: "center",
    gap: 1.5,
  } as SxProps<Theme>,

  // Button styles
  cancelButton: {
    color: "white",
    backgroundColor: "#666",
    "&:hover": { backgroundColor: "#555" },
    minWidth: "90px",
    textTransform: "none",
    borderRadius: "8px",
    padding: "10px 20px",
  } as SxProps<Theme>,

  saveButton: {
    backgroundColor: "#8BC34A",
    color: "white",
    "&:hover": { backgroundColor: "#7CB342" },
    minWidth: "90px",
    textTransform: "none",
    borderRadius: "8px",
    padding: "10px 20px",
  } as SxProps<Theme>,
}
