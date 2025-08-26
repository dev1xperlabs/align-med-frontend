"use client";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { StyledFormControl, StyledIconFormControl } from "@/components/styled";
import { tableStyles } from "@/styles";
import { addDays } from "@/utils";
import { RestartAlt } from "@mui/icons-material";

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
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentYear = new Date().getFullYear();

  const startMin =
    groupBy !== "month" && endDate ? addDays(endDate, -364) : undefined;
  const startMax = groupBy !== "month" && endDate ? endDate : undefined;

  const endMin = groupBy !== "month" && startDate ? startDate : undefined;

  let endMax: string | undefined = undefined;
  if (groupBy !== "month" && startDate) {
    const startYear = new Date(startDate).getFullYear();
    if (startYear === currentYear) {
      endMax = today;
    } else {
      endMax = addDays(startDate, 364);
    }
  }

  const handleResetDates = () => {
    onStartDateChange?.("");
    onEndDateChange?.("");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isEditable && (
        <>
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
                onPointerEnter: (e: any) => (e.currentTarget.title = ""),
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
                onPointerEnter: (e: any) => (e.currentTarget.title = ""),
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

          <StyledIconFormControl>
            <Tooltip title="Reset Date" arrow placement="top">
              <IconButton
                onClick={handleResetDates}
                size="small"
                color="primary"
                disabled={!isEditable || (!startDate && !endDate)}
              >
                <RestartAlt fontSize="small" />
              </IconButton>
            </Tooltip>
          </StyledIconFormControl>
        </>
      )}
    </Box>
  );
}
