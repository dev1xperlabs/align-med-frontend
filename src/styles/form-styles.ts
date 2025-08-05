import type { SxProps, Theme } from "@mui/material/styles"

export const formStyles = {
  // Input field styles
  textField: {
    "& .MuiOutlinedInput-root": {
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
  } as SxProps<Theme>,

  // Date input styles
  dateField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#8BC34A",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8BC34A",
      },
      "& input[type='date']::-webkit-calendar-picker-indicator": {
        filter: "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(110%) contrast(119%)",
        cursor: "pointer",
      },
    },
  } as SxProps<Theme>,

  // Form container styles
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  } as SxProps<Theme>,

  formRow: {
    display: "flex",
    gap: 3,
    flex: 1,
  } as SxProps<Theme>,

  formField: {
    flex: 1,
  } as SxProps<Theme>,

  // Label styles
  fieldLabel: {
    mb: 1,
    fontWeight: 500,
    color: "#666",
    fontSize: "14px",
  } as SxProps<Theme>,
}
