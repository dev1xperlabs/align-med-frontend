"use client";

import type React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { DashboardLayout } from "@/components/dahboard/Dashboard-layout";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TableCell,
  TableRow,
  TablePagination,
  IconButton,
  Typography,
  Fade,
  TextField,
  useTheme,
  FormHelperText,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  StyledDashboardCard,
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledSelect,
  StyledPrimaryButton,
} from "@/components/styled";
import {
  SingleSelectDropdown,
  MultiSelectDropdown,
} from "@/components/common/CustomDropdown";
import Swal from "sweetalert2";
import { api } from "../../lib/api";

import { TableSkeleton } from "@/components/common/LoadingSkeletons";
import {
  CreateDoctorBonusRule,
  DoctorBonusRule,
  UpdateDoctorBonusRule,
} from "@/model/doctor-bonus-rule/doctor-bonus-rule";
import { iDoctor } from "@/model/doctor/doctor";
import { iAttorney } from "@/model/attorneys/attorneys";
import { red } from "@mui/material/colors";
import PercentIcon from "@mui/icons-material/Percent";

interface FormErrors {
  doctorName?: string;
  percentage?: string;
  ruleName?: string;
  attorneyNames?: string;
}

export default function AddDoctorBonusRulePage() {
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRule, setEditingRule] = useState<DoctorBonusRule | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const queryClient = useQueryClient();

  const theme = useTheme();

  const [formData, setFormData] = useState({
    doctorName: "",
    attorneyNames: [] as string[],
    percentage: "",
    ruleName: "",
  });

  const {
    data: doctors = [],
    isLoading: isLoadingDoctors,
    error: doctorsError,
  } = useQuery<iDoctor[], Error>({
    queryKey: ["doctors"],
    queryFn: () => api.getDoctors(),
  });

  const {
    data: attorneys = [],
    isLoading: isLoadingAttorneys,
    error: attorneysError,
  } = useQuery<iAttorney[], Error>({
    queryKey: ["attorneys"],
    queryFn: () => api.getAttorneys(),
  });

  // Optimized: Memoize data maps only when data changes
  const doctorMap = useMemo(
    () => new Map(doctors.map((d) => [d.id, d.name])),
    [doctors]
  );
  const doctorNameMap = useMemo(
    () => new Map(doctors.map((d) => [d.name, d.id])),
    [doctors]
  );
  const attorneyMap = useMemo(
    () => new Map(attorneys.map((a) => [a.id, a.name])),
    [attorneys]
  );
  const attorneyNameMap = useMemo(
    () => new Map(attorneys.map((a) => [a.name, a.id])),
    [attorneys]
  );

  const {
    data: bonusRules = [],
    isLoading: isLoadingRules,
    error: rulesError,
  } = useQuery<DoctorBonusRule[], Error>({
    queryKey: ["bonusRules"],
    queryFn: () => api.getRules(),
  });

  const filteredRules = useMemo(() => {
    if (!selectedDoctorFilter) {
      return bonusRules;
    }
    const selectedDoctorId = doctorNameMap.get(selectedDoctorFilter);
    if (selectedDoctorId === undefined) {
      return bonusRules;
    }
    return bonusRules.filter((rule) => rule.provider_id === selectedDoctorId);
  }, [bonusRules, selectedDoctorFilter, doctorNameMap]);

  // Validation function
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.doctorName.trim()) {
      errors.doctorName = "Doctor selection is required";
    }

    if (!formData.percentage.trim()) {
      errors.percentage = "Percentage is required";
    } else {
      const percentageValue = Number.parseFloat(formData.percentage);
      if (
        isNaN(percentageValue) ||
        percentageValue <= 0 ||
        percentageValue > 100
      ) {
        errors.percentage = "Please enter a valid percentage between 1 and 100";
      }
    }

    if (!formData.ruleName.trim()) {
      errors.ruleName = "Rule name is required";
    }

    if (formData.attorneyNames.length === 0) {
      errors.attorneyNames = "At least one attorney must be selected";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createMutation = useMutation<any, Error, CreateDoctorBonusRule>({
    mutationFn: (data) => api.createRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonusRules"] });
      handleCloseDialog();
      Swal.fire({
        title: "Success!",
        text: "Doctor bonus rule created successfully.",
        icon: "success",
        confirmButtonColor: theme.palette.primary.main,
        timer: 2000,
        timerProgressBar: true,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to create doctor bonus rule.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    },
  });

  const updateMutation = useMutation<
    any,
    Error,
    { id: string; data: UpdateDoctorBonusRule }
  >({
    mutationFn: ({ id, data }) => api.updateRule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonusRules"] });
      handleCloseDialog();
      Swal.fire({
        title: "Success!",
        text: "Doctor bonus rule updated successfully.",
        icon: "success",
        confirmButtonColor: theme.palette.primary.main,
        timer: 2000,
        timerProgressBar: true,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update doctor bonus rule.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    },
  });

  const deleteMutation = useMutation<any, Error, string>({
    mutationFn: (id) => api.deleteRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bonusRules"] });
      Swal.fire({
        title: "Deleted!",
        text: "The bonus rule has been deleted successfully.",
        icon: "success",
        confirmButtonColor: theme.palette.primary.main,
        timer: 2000,
        timerProgressBar: true,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete doctor bonus rule.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    },
  });

  // Optimized: Memoized event handlers
  const handleDoctorNameChange = useCallback(
    (value: string) => {
      setFormData((prev) => ({ ...prev, doctorName: value }));
      // Clear error when user makes a selection
      if (value && formErrors.doctorName) {
        setFormErrors((prev) => ({ ...prev, doctorName: undefined }));
      }
    },
    [formErrors.doctorName]
  );

  const handleAttorneyNamesChange = useCallback(
    (value: string[]) => {
      setFormData((prev) => ({ ...prev, attorneyNames: value }));
      // Clear error when user makes a selection
      if (value.length > 0 && formErrors.attorneyNames) {
        setFormErrors((prev) => ({ ...prev, attorneyNames: undefined }));
      }
    },
    [formErrors.attorneyNames]
  );

  const handlePercentageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, percentage: value }));
      // Clear error when user types
      if (value && formErrors.percentage) {
        setFormErrors((prev) => ({ ...prev, percentage: undefined }));
      }
    },
    [formErrors.percentage]
  );

  const handleRuleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, ruleName: value }));
      // Clear error when user types
      if (value && formErrors.ruleName) {
        setFormErrors((prev) => ({ ...prev, ruleName: undefined }));
      }
    },
    [formErrors.ruleName]
  );

  const handleDoctorFilterChange = useCallback((e: any) => {
    setSelectedDoctorFilter(e.target.value as string);
  }, []);

  // Optimized: Memoized dialog handlers
  const handleOpenDialog = useCallback(
    (rule?: DoctorBonusRule) => {
      if (rule) {
        setEditingRule(rule);
        setFormData({
          doctorName: doctorMap.get(rule.provider_id) || "",
          attorneyNames: rule.attorney_ids
            .map((id) => attorneyMap.get(Number(id)) || "")
            .filter(Boolean),
          percentage: rule.bonus_percentage,
          ruleName: rule.rule_name ?? "",
        });
      } else {
        setEditingRule(null);
        setFormData({
          doctorName: "",
          attorneyNames: [],
          percentage: "",
          ruleName: "",
        });
      }
      setFormErrors({}); // Clear any previous errors
      setOpenDialog(true);
    },
    [doctorMap, attorneyMap]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setEditingRule(null);
    setFormData({
      doctorName: "",
      attorneyNames: [],
      percentage: "",
      ruleName: "",
    });
    setFormErrors({}); // Clear errors when closing
  }, []);

  const handleSaveRule = useCallback(() => {
    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    const providerId = doctorNameMap.get(formData.doctorName);
    const attorneyIds = formData.attorneyNames
      .map((name) => attorneyNameMap.get(name))
      .filter((id) => id !== undefined) as number[];

    if (editingRule) {
      const updatePayload: UpdateDoctorBonusRule = {
        rule: {
          provider_id: providerId!,
          bonus_percentage: Number.parseFloat(formData.percentage),
          status: "1",
          rule_name: formData.ruleName,
        },
        rule_attorney_mapping: attorneyIds.map((attorney_id) => ({
          attorney_id,
        })),
      };
      console.log(
        "Sending update payload:",
        JSON.stringify(updatePayload, null, 2)
      ); // Added log
      updateMutation.mutate({ id: editingRule.id, data: updatePayload });
    } else {
      const createPayload: CreateDoctorBonusRule = {
        rule: {
          provider_id: providerId!,
          bonus_percentage: Number.parseFloat(formData.percentage),
          status: "1",
          rule_name: formData.ruleName,
        },
        rule_attorney_mapping: attorneyIds.map((attorney_id) => ({
          attorney_id,
        })),
      };
      console.log(
        "Sending create payload:",
        JSON.stringify(createPayload, null, 2)
      ); // Added log
      createMutation.mutate(createPayload);
    }
  }, [
    formData,
    doctorNameMap,
    attorneyNameMap,
    editingRule,
    createMutation,
    updateMutation,
  ]);

  const handleDeleteRule = useCallback(
    async (id: string, doctorName: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete the bonus rule for ${doctorName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: theme.palette.primary.main,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(Number.parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  // Optimized: Memoized pagination
  const paginatedRules = useMemo(() => {
    return filteredRules.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredRules, page, rowsPerPage]);

  if (isLoadingDoctors || isLoadingAttorneys || isLoadingRules) {
    return (
      <DashboardLayout>
        <Box>
          <TableSkeleton />
        </Box>
      </DashboardLayout>
    );
  }

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
        .swal-cancel-btn {
          border-radius: 8px !important;
          font-weight: 500 !important;
          padding: 10px 24px !important;
        }
      `}</style>

      <DashboardLayout>
        <Box>
          <StyledDashboardCard>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ minWidth: 220 }}>
                    {/* <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                     
                    </Typography> */}
                    <StyledSelect
                      value={selectedDoctorFilter}
                      onChange={handleDoctorFilterChange}
                      displayEmpty
                      size="medium"
                      sx={{
                        minWidth: 220,
                        height: 48,
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        fontSize: "14px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e0e0e0",
                          borderWidth: "1px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                          borderWidth: "2px",
                        },
                        "& .MuiSelect-select": {
                          padding: "12px 14px",
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiSelect-icon": {
                          color: "#666",
                          fontSize: "20px",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "12px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                            border: "1px solid #e0e0e0",
                            mt: 1,
                            maxHeight: 300,
                            "& .MuiMenuItem-root": {
                              fontSize: "14px",
                              padding: "10px 16px",
                              color: "#333",
                              "&:hover": {
                                backgroundColor: "#f0f8e8",
                              },
                              "&.Mui-selected": {
                                backgroundColor: "#e8f5c8",
                                fontWeight: 500,
                                "&:hover": {
                                  backgroundColor: "#e8f5c8",
                                },
                              },
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem
                        value=""
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: theme.palette.primary.main,
                          borderBottom: "1px solid #f0f0f0",
                        }}
                      >
                        All Doctors
                      </MenuItem>
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </Box>
                </Box>
              </Box>

              <StyledPrimaryButton
                onClick={() => handleOpenDialog()}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: "#7CB342" },
                }}
              >
                Add A New Rule
              </StyledPrimaryButton>
            </Box>

            {(doctorsError || attorneysError || rulesError) && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "error.light",
                  color: "error.dark",
                  borderRadius: 1,
                  m: 2,
                }}
              >
                Error loading data:{" "}
                {(doctorsError || attorneysError || rulesError)?.message}
              </Box>
            )}

            {/* Table */}
            <StyledTableContainer>
              <StyledTable>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Rule Name</TableCell>
                    <TableCell>Doctor Name</TableCell>
                    <TableCell>Bonus Percentage</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {paginatedRules.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{ textAlign: "center", py: 4 }}
                      >
                        <Typography variant="h6" color="text.secondary">
                          No Records Found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRules.map((rule: DoctorBonusRule) => (
                      <TableRow key={rule.id}>
                        <TableCell>{rule.rule_name}</TableCell>
                        <TableCell>
                          {doctorMap.get(rule.provider_id) || "Unknown Doctor"}
                        </TableCell>
                        <TableCell>{rule.bonus_percentage}%</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(rule)}
                              sx={{ color: "#666" }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteRule(
                                  rule.id,
                                  doctorMap.get(rule.provider_id) ||
                                    "Unknown Doctor"
                                )
                              }
                              sx={{ color: "#d32f2f" }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </StyledTableBody>
              </StyledTable>

              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={filteredRules.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  borderTop: (theme) => `1px solid ${theme.palette.grey[200]}`,
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
              />
            </StyledTableContainer>
          </StyledDashboardCard>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="xs"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: "12px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                width: "420px",
                maxWidth: "420px",
              },
            }}
            TransitionComponent={Fade}
            transitionDuration={300}
          >
            <DialogTitle
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                pb: 2,
                textAlign: "center",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {editingRule ? "Edit Rule" : "Add a Rule"}
            </DialogTitle>

            <DialogContent sx={{ pt: 3, pb: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <SingleSelectDropdown
                    options={doctors.map((d) => d.name)}
                    value={formData.doctorName}
                    onChange={handleDoctorNameChange}
                    placeholder="Select doctor"
                    label="Doctors"
                    error={!!formErrors.doctorName}
                  />
                  {formErrors.doctorName && (
                    <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                      {formErrors.doctorName}
                    </FormHelperText>
                  )}
                </Box>

                <Box>
                  <MultiSelectDropdown
                    options={attorneys.map((a) => a.name)}
                    value={formData.attorneyNames}
                    onChange={handleAttorneyNamesChange}
                    placeholder="Select attorneys"
                    label="Attorneys"
                    maxVisibleItems={3}
                    error={!!formErrors.attorneyNames}
                  />
                  {formErrors.attorneyNames && (
                    <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                      {formErrors.attorneyNames}
                    </FormHelperText>
                  )}
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: formErrors.percentage ? "#d32f2f" : "#666",
                      fontSize: "14px",
                    }}
                  >
                    Percentage{" "}
                    <Box component="span" sx={{ color: red[500] }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.percentage}
                    onChange={handlePercentageChange}
                    placeholder="Enter percentage"
                    size="medium"
                    type="number"
                    error={!!formErrors.percentage}
                    InputProps={{
                      endAdornment: (
                        <PercentIcon sx={{ color: "#787878", opacity: 0.6 }} />
                      ),
                      inputProps: {
                        style: {
                          MozAppearance: "textfield",
                        },
                        inputMode: "decimal",
                      },
                      sx: {
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },

                        "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                          {
                            WebkitAppearance: "none",
                            margin: 0,
                          },
                      },
                    }}
                  />
                  {formErrors.percentage && (
                    <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                      {formErrors.percentage}
                    </FormHelperText>
                  )}
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: 500,
                      color: formErrors.ruleName ? "#d32f2f" : "#666",
                      fontSize: "14px",
                    }}
                  >
                    Rule Name{" "}
                    <Box component="span" sx={{ color: red[500] }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.ruleName}
                    onChange={handleRuleNameChange}
                    placeholder="Enter rule name"
                    size="medium"
                    error={!!formErrors.ruleName}
                  />
                  {formErrors.ruleName && (
                    <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
                      {formErrors.ruleName}
                    </FormHelperText>
                  )}
                </Box>
              </Box>
            </DialogContent>

            <DialogActions
              sx={{ p: 3, pt: 2, justifyContent: "center", gap: 1.5 }}
            >
              <Button
                onClick={handleCloseDialog}
                sx={{
                  color: "white",
                  backgroundColor: "#666",
                  "&:hover": { backgroundColor: "#555" },
                  minWidth: "90px",
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveRule}
                disabled={createMutation.isPending || updateMutation.isPending}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": { backgroundColor: theme.palette.primary.main },
                  minWidth: "90px",
                  textTransform: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                {createMutation.isPending
                  ? "Creating..."
                  : updateMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </DashboardLayout>
    </>
  );
}
