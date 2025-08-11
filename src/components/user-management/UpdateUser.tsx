"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormHelperText,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Person, Email, Work, CheckCircle, Cancel } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
  UpdateUserDto,
  Role,
  User,
  UserListDto,
} from "@/app/user-management/interface/user-management";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

type FormErrors = Partial<Record<string, string>>;

type UpdateUserProps = {
  open: boolean;
  onClose: () => void;
  updateUserId: number;
  refetchUserList: () => void;
};

const statusOptions = [
  ["1", "Active"],
  ["0", "Inactive"],
];

export default function UpdateUser({
  open,
  onClose,
  updateUserId,
  refetchUserList,
}: UpdateUserProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [updateUserDto, setUpdateUserDto] = useState<UpdateUserDto>({
    id: updateUserId,
    first_name: "",
    last_name: "",
    email: "",
    role_id: null,
    status: "1",
    updated_at: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const {
    data: updateUserData,
    isLoading: isLoadingUpdateUser,
    error: updateUserError,
    refetch: refetchUpadateUset,
  } = useQuery({
    queryKey: ["users", updateUserId] as const,
    queryFn: ({ queryKey }) => {
      const [, updateUserId] = queryKey;
      return api
        .getUserById(updateUserId)
        .then((response) => {
          setUpdateUserDto({
            id: response.result.id,
            first_name: response.result.first_name,
            last_name: response.result.last_name,
            email: response.result.email,
            role_id: response.result.role_id,
            status: response.result.status,
            updated_at: response.result.updated_at || new Date(),
          });
          return response.result;
        })
        .catch((error) => {
          return [];
        });
    },
  });

  console.log("Update User Data:", updateUserDto);

  const handleFieldChange = (field: keyof UpdateUserDto, value: any) => {
    setUpdateUserDto((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const {
    data: rolesData = [],
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useQuery<Role[], Error>({
    queryKey: ["roles"],
    queryFn: () => api.getRoles(),
  });

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!updateUserDto.first_name.trim())
      errors.first_name = "First name is required";
    if (!updateUserDto.last_name.trim())
      errors.last_name = "Last name is required";
    if (!updateUserDto.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(updateUserDto.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!updateUserDto.role_id) {
      errors.role_id = "Role selection is required";
    }
    if (!updateUserDto.status) errors.status = "Status is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateUserMutation = useMutation<
    any,
    Error,
    { updateUserDto: UpdateUserDto }
  >({
    mutationFn: ({ updateUserDto }) => api.updateUser(updateUserDto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
      toast.success("User updated successfully.");
      refetchUserList();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.errorMessage ||
        error?.response?.data?.resultMessage ||
        "Failed to update user";

      toast.error(message);
    },
  });

  const handleSaveUser = () => {
    if (!validateForm()) return;
    updateUserMutation.mutate({ updateUserDto });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          width: "500px",
          maxWidth: "500px",
        },
      }}
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
        Edit User
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {(["first_name", "last_name", "email"] as const).map((field) => (
            <Box key={field}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: formErrors[field] ? "#d32f2f" : "#666",
                  fontSize: "14px",
                }}
              >
                {field === "first_name"
                  ? "First Name"
                  : field === "last_name"
                  ? "Last Name"
                  : "Email"}{" "}
                <Box component="span" sx={{ color: red[500] }}>
                  *
                </Box>
              </Typography>
              <TextField
                fullWidth
                type="text"
                size="medium"
                value={updateUserDto[field]}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                error={!!formErrors[field]}
                InputProps={{
                  startAdornment:
                    field === "first_name" || field === "last_name" ? (
                      <Person sx={{ color: "#787878", opacity: 0.6, mr: 1 }} />
                    ) : field === "email" ? (
                      <Email sx={{ color: "#787878", opacity: 0.6, mr: 1 }} />
                    ) : null,
                }}
              />
              {formErrors[field] && (
                <FormHelperText error>{formErrors[field]}</FormHelperText>
              )}
            </Box>
          ))}

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: formErrors.role_id ? "#d32f2f" : "#666",
                fontSize: "14px",
              }}
            >
              Role{" "}
              <Box component="span" sx={{ color: red[500] }}>
                *
              </Box>
            </Typography>
            <TextField
              select
              fullWidth
              value={updateUserDto.role_id}
              onChange={(e) => handleFieldChange("role_id", e.target.value)}
              error={!!formErrors.role_id}
              InputProps={{
                startAdornment: (
                  <Work sx={{ color: "#787878", opacity: 0.6, mr: 1 }} />
                ),
              }}
            >
              {rolesData.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            {formErrors.role_id && (
              <FormHelperText error>{formErrors.role_id}</FormHelperText>
            )}
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: formErrors.status ? "#d32f2f" : "#666",
                fontSize: "14px",
              }}
            >
              Status{" "}
              <Box component="span" sx={{ color: red[500] }}>
                *
              </Box>
            </Typography>
            <TextField
              select
              fullWidth
              value={updateUserDto.status}
              onChange={(e) => handleFieldChange("status", e.target.value)}
              error={!!formErrors.status}
              InputProps={{
                startAdornment:
                  updateUserDto.status === "1" ? (
                    <CheckCircle sx={{ color: "green", opacity: 0.6, mr: 1 }} />
                  ) : (
                    <Cancel sx={{ color: "red", opacity: 0.6, mr: 1 }} />
                  ),
              }}
            >
              {statusOptions.map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
            {formErrors.status && (
              <FormHelperText error>{formErrors.status}</FormHelperText>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, justifyContent: "center", gap: 1.5 }}>
        <Button
          onClick={handleClose}
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
          onClick={handleSaveUser}
          disabled={updateUserMutation.isPending}
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
          {updateUserMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
