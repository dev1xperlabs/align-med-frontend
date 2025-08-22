"use client";
import { Box, TextField } from "@mui/material";
import { StyledFormControl } from "@/components/styled";
import { tableStyles } from "@/styles";
import { addDays } from "@/utils";

interface DateRangeDropdownsProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  isEditable?: boolean;
  groupBy?: string;
}

export default function DateRangeDropdowns({
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
  isEditable = false,
  groupBy = "",
}: DateRangeDropdownsProps) {
  const startMin =
    groupBy !== "month" && endDate ? addDays(endDate, -365) : undefined;
  const startMax = groupBy !== "month" && endDate ? endDate : undefined;

  const endMin = groupBy !== "month" && startDate ? startDate : undefined;
  const endMax =
    groupBy !== "month" && startDate ? addDays(startDate, 365) : undefined;

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <StyledFormControl size="medium" sx={tableStyles.filterFormControl}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange?.(e.target.value)}
          disabled={!isEditable}
          size="small"
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: startMin,
            max: startMax,
          }}
          sx={{
            minHeight: 40,
            fontSize: 14,
            minWidth: 120,
            "& .MuiInputBase-input": {
              color: isEditable ? "inherit" : "text.secondary",
            },
          }}
        />
      </StyledFormControl>

      <StyledFormControl size="medium" sx={tableStyles.filterFormControl}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange?.(e.target.value)}
          disabled={!isEditable}
          size="small"
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: endMin,
            max: endMax,
          }}
          sx={{
            minHeight: 40,
            fontSize: 14,
            minWidth: 120,
            "& .MuiInputBase-input": {
              color: isEditable ? "inherit" : "text.secondary",
            },
          }}
        />
      </StyledFormControl>
    </Box>
  );
}
