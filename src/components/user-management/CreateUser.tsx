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
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Work,
  CheckCircle,
  Cancel,
  Lock,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
  CreateUserDto,
  Role,
  User,
} from "@/app/user-management/interface/user-management";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

type FormErrors = Partial<Record<string, string>>;

type CreateUserProps = {
  open: boolean;
  onClose: () => void;
  userToEdit?: User | null;
  refetchUserList: () => void;
};

const statusOptions = [
  ["1", "Active"],
  ["0", "Inactive"],
];

export default function CreateUser({
  open,
  onClose,
  userToEdit,
  refetchUserList,
}: CreateUserProps) {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [editingUser, setEditingUser] = useState<User | null>(
    userToEdit || null
  );

  const [showPassword, setShowPassword] = useState(false);

  const [createUserDto, setCreateUserDto] = useState<CreateUserDto>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role_id: null,
    status: "1",
    created_at: null,
    updated_at: null,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleFieldChange = (field: keyof CreateUserDto, value: any) => {
    console.log("Field changed:", field, value);
    setCreateUserDto((prev) => ({ ...prev, [field]: value }));
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
    debugger;
    if (!createUserDto.first_name.trim())
      errors.first_name = "First name is required";
    if (!createUserDto.last_name.trim())
      errors.last_name = "Last name is required";
    if (!createUserDto.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(createUserDto.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!createUserDto.role_id) {
      errors.role = "Role selection is required";
    }
    if (editingUser && !createUserDto.status)
      errors.status = "Status is required";
    if (!editingUser && !(createUserDto.password ?? "").trim()) {
      errors.password = "Password is required";
    } else if (!editingUser && (createUserDto.password ?? "").length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createUserMutation = useMutation<any, Error, CreateUserDto>({
    mutationFn: (data: CreateUserDto) => api.createUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      emptyFeilds();
      onClose();
      toast.success(data?.resultMessage || "User created successfully.");
      refetchUserList();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.errorMessage, {
        toastId: 1,
      });
    },
  });

  const handleSaveUser = () => {
    if (!validateForm()) return;
    createUserMutation.mutate(createUserDto);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const emptyFeilds = () => {
    setCreateUserDto({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role_id: null,
      status: "1",
      created_at: null,
      updated_at: null,
    });
    setFormErrors({});
  };

  const hamdleClose = () => {
    emptyFeilds();
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {editingUser ? "Edit User" : "Add New User"}
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {(["first_name", "last_name", "email", "password"] as const).map(
            (field) =>
              field === "password" && editingUser ? null : (
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
                      : field === "email"
                      ? "Email"
                      : "Password"}{" "}
                    <Box component="span" sx={{ color: red[500] }}>
                      *
                    </Box>
                  </Typography>
                  <TextField
                    fullWidth
                    type={
                      field === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    size="medium"
                    value={createUserDto[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    error={!!formErrors[field]}
                    InputProps={{
                      startAdornment:
                        field === "first_name" || field === "last_name" ? (
                          <Person
                            sx={{ color: "#787878", opacity: 0.6, mr: 1 }}
                          />
                        ) : field === "email" ? (
                          <Email
                            sx={{ color: "#787878", opacity: 0.6, mr: 1 }}
                          />
                        ) : field === "password" ? (
                          <Lock
                            sx={{ color: "#787878", opacity: 0.6, mr: 1 }}
                          />
                        ) : null,
                      endAdornment:
                        field === "password" ? (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                              size="small"
                              sx={{
                                color: "#6c757d",
                                "&:hover": {
                                  color: theme.palette.primary.main,
                                },
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                  {formErrors[field] && (
                    <FormHelperText error>{formErrors[field]}</FormHelperText>
                  )}
                </Box>
              )
          )}

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: formErrors.role ? "#d32f2f" : "#666",
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
              value={createUserDto.role_id}
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
            {formErrors.role && (
              <FormHelperText error>{formErrors.role}</FormHelperText>
            )}
          </Box>

          {editingUser && (
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
                value={createUserDto.status}
                onChange={(e) => handleFieldChange("status", e.target.value)}
                error={!!formErrors.status}
                InputProps={{
                  startAdornment:
                    createUserDto.status === "1" ? (
                      <CheckCircle
                        sx={{ color: "green", opacity: 0.6, mr: 1 }}
                      />
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
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, justifyContent: "center", gap: 1.5 }}>
        <Button
          onClick={hamdleClose}
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
          disabled={createUserMutation.isPending}
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
          {createUserMutation.isPending ? "Creating..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
