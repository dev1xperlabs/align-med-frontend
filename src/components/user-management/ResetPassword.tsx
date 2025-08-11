"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { ResetPasswordDto } from "@/app/user-management/interface/user-management";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface ResetPasswordProps {
  userId: number;
  openResetPassword: boolean;
  onCloseResetPassword: () => void;
}

const ResetPassword = ({
  userId,
  openResetPassword,
  onCloseResetPassword,
}: ResetPasswordProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordDto, setResetPasswordDto] = useState<ResetPasswordDto>({
    user_id: userId,
    password: "",
  });
  const [resetFormError, setResetFormError] = useState("");

  const resetPasswordMutation = useMutation<any, Error, ResetPasswordDto>({
    mutationFn: (resetPasswordDto) =>
      api.resetPassword({
        user_id: userId,
        password: resetPasswordDto.password,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onCloseResetPassword();
      setResetPasswordDto({
        user_id: userId,
        password: "",
      });
      setResetFormError("");
      toast.success("Password reset successfully.");
    },
    onError: (error) => {
      toast.error(`Failed to reset password`);
    },
  });

  const handleResetPasswordChange = (value: string) => {
    setResetPasswordDto({
      user_id: userId,
      password: value,
    });
    setResetFormError("");
  };

  const handleSubmitResetPassword = () => {
    if (!resetPasswordDto.password || resetPasswordDto.password.length < 6) {
      setResetFormError("Password must be at least 6 characters.");
      return;
    }
    resetPasswordMutation.mutate(resetPasswordDto);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (openResetPassword) {
      setResetPasswordDto({
        user_id: userId,
        password: "",
      });
    }
  }, [openResetPassword, userId]);

  return (
    <Dialog
      open={openResetPassword}
      onClose={onCloseResetPassword}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          width: "400px",
          maxWidth: "400px",
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
        Reset Password
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: 500,
              color: resetFormError ? "#d32f2f" : "#666",
              fontSize: "14px",
            }}
          >
            New Password{" "}
            <Box component="span" sx={{ color: red[500] }}>
              *
            </Box>
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            size="medium"
            value={resetPasswordDto.password}
            onChange={(e) => handleResetPasswordChange(e.target.value)}
            error={!!resetFormError}
            InputProps={{
              endAdornment: (
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {resetFormError && (
            <FormHelperText error sx={{ mt: 0.5, ml: 0 }}>
              {resetFormError}
            </FormHelperText>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, justifyContent: "center", gap: 1.5 }}>
        <Button
          onClick={onCloseResetPassword}
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
          onClick={handleSubmitResetPassword}
          disabled={resetPasswordMutation.isPending}
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
          {resetPasswordMutation.isPending ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPassword;
