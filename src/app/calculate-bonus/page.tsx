"use client";

import { use, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dahboard/Dashboard-layout";
import {
  Box,
  TextField,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  InputAdornment,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  StyledDashboardCard,
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledPrimaryButton,
} from "@/components/styled";

import { api } from "../../lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { formatDatePretty } from "@/utils/date-helpers";
import {
  iBonusCalculationResult,
  iCalculateBonusRequest,
} from "@/model/bonus-calculation/bonusCalculation";
import { DoctorBonusRule } from "@/model/doctor-bonus-rule/doctor-bonus-rule";

export default function CalculateBonusPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [calculations, setCalculations] = useState<iBonusCalculationResult[]>(
    []
  );

  const theme = useTheme();
  const {
    data: bonusRules = [],
    isLoading: isLoadingRules,
    error: rulesError,
    isError,
  } = useQuery<DoctorBonusRule[], Error>({
    queryKey: ["bonusRules"],
    queryFn: () => api.getRules(),
  });

  const calculateBonusMutation = useMutation<
    iBonusCalculationResult[],
    Error,
    iCalculateBonusRequest
  >({
    mutationFn: (data) => api.calculateBonus(data),
    onSuccess: (data) => {
      console.log("Bonus calculation successful:", data);
      setCalculations(data);

      if (data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Records Found",
          text: "No bonus calculations found for the selected criteria.",
          confirmButtonColor: theme.palette.primary.main,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Calculation Complete",
          text: `Found ${data.length} bonus calculation${
            data.length > 1 ? "s" : ""
          }.`,
          confirmButtonColor: theme.palette.primary.main,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    },
    onError: (error) => {
      console.error("Bonus calculation failed:", error);
      Swal.fire({
        icon: "error",
        title: "Calculation Failed",
        text: error.message || "Failed to calculate bonus. Please try again.",
        confirmButtonColor: "#d33",
      });
    },
  });

  const handleCalculateBonus = () => {
    const ruleObjected = bonusRules.find((rule) => rule.id === selectedRule);

    if (!fromDate || !toDate || !selectedRule) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select dates and a rule before calculating bonus.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Date Range",
        text: "From date cannot be later than To date.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    const requestData: iCalculateBonusRequest = {
      fromDate: fromDate,
      toDate: toDate,
      rule_id: selectedRule,
    };

    calculateBonusMutation.mutate(requestData);
  };

  useEffect(() => {
    if (isError && rulesError) {
      console.error("Error fetching bonus rules:", rulesError);
    }
  }, [isError, rulesError]);

  const totalAmount = calculations.reduce(
    (sum, calc) => sum + Number.parseFloat(calc.bonus_amount || "0"),
    0
  );

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(num);
  };

  return (
    <>
      <style jsx global>{`
        .swal-popup {
          border-radius: 12px !important;
          font-family: "Manrope", sans-serif !important;
        }
        .swal-title {
          font-size: 20px !important;
          font-weight: 600 !important;
          color: #333 !important;
        }
        .swal-content {
          font-size: 16px !important;
          color: #666 !important;
        }
        .swal-confirm-btn {
          border-radius: 8px !important;
          font-weight: 500 !important;
          padding: 10px 24px !important;
        }
      `}</style>

      <DashboardLayout>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <StyledDashboardCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                p: 3,
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", gap: 3, flex: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    From Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "& input[type='date']::-webkit-calendar-picker-indicator":
                          {
                            filter:
                              "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(110%) contrast(119%)",
                            cursor: "pointer",
                          },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    To Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#e0e0e0",
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: theme.palette.primary.main,
                        },
                        "& input[type='date']::-webkit-calendar-picker-indicator":
                          {
                            filter:
                              "invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(110%) contrast(119%)",
                            cursor: "pointer",
                          },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                    Rule Name
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    value={selectedRule}
                    onChange={(e) => setSelectedRule(e.target.value)}
                    placeholder="Select Rule Name"
                    size="medium"
                    disabled={isLoadingRules}
                    sx={{
                      "& .MuiOutlinedInput-root": {
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
                    }}
                    InputProps={{
                      endAdornment: isLoadingRules ? (
                        <InputAdornment position="end">
                          <CircularProgress size={20} />
                        </InputAdornment>
                      ) : null,
                    }}
                  >
                    <MenuItem value="">
                      {isLoadingRules ? "Loading..." : "Select Rule Name"}
                    </MenuItem>
                    {bonusRules.map((rule) => (
                      <MenuItem key={rule.id} value={rule.id}>
                        {rule.rule_name || `Rule ${rule.id}`}
                      </MenuItem>
                    ))}
                  </TextField>
                  {isError && (
                    <Typography
                      variant="caption"
                      sx={{ color: "error.main", mt: 0.5 }}
                    >
                      Error loading rules
                    </Typography>
                  )}
                </Box>
              </Box>

              <StyledPrimaryButton
                onClick={handleCalculateBonus}
                disabled={
                  isLoadingRules ||
                  !fromDate ||
                  !toDate ||
                  !selectedRule ||
                  calculateBonusMutation.isPending
                }
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: "#7CB342" },
                  "&:disabled": { backgroundColor: "#ccc" },
                  minWidth: "150px",
                  height: "56px",
                }}
              >
                {calculateBonusMutation.isPending ? (
                  <>
                    <CircularProgress
                      size={20}
                      sx={{ mr: 1, color: "white" }}
                    />
                    Calculating...
                  </>
                ) : (
                  "Calculate Bonus"
                )}
              </StyledPrimaryButton>
            </Box>
          </StyledDashboardCard>

          {(calculations.length > 0 || calculateBonusMutation.isSuccess) && (
            <StyledDashboardCard>
              <StyledTableContainer>
                <StyledTable>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Rule Id</TableCell> */}
                      <TableCell>Attorney Name</TableCell>
                      <TableCell>Bonus Percentage</TableCell>
                      {/* <TableCell>Total Billed Charges</TableCell> */}
                      <TableCell>Bonus Amount</TableCell>
                    </TableRow>
                  </StyledTableHead>
                  <StyledTableBody>
                    {calculations.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          sx={{ textAlign: "center", py: 4 }}
                        >
                          <Typography variant="h6" color="text.secondary">
                            No Records Found
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            No bonus calculations found for the selected
                            criteria.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      calculations.map((calc, index) => (
                        <TableRow
                          key={`${calc.rule_id}-${calc.attorney_id}-${index}`}
                        >
                          <TableCell>{calc.billed_date}</TableCell>
                          {/* <TableCell>{calc.provider_id}</TableCell> */}
                          <TableCell>{calc.attorney_name}</TableCell>
                          <TableCell>{calc.bonus_percentage}%</TableCell>
                          {/* <TableCell>
                            {formatCurrency(calc.total_billed_charges)}
                          </TableCell> */}
                          <TableCell>
                            {formatCurrency(calc.bonus_amount)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </StyledTableBody>
                </StyledTable>
              </StyledTableContainer>

              {calculations.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 3,
                    borderTop: "1px solid #e0e0e0",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total Bonus Amount: {formatCurrency(totalAmount)}
                  </Typography>
                </Box>
              )}
            </StyledDashboardCard>
          )}
        </Box>
      </DashboardLayout>
    </>
  );
}
