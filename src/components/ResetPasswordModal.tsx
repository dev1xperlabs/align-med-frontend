"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Close, Email } from "@mui/icons-material";
import { StyledLoginTextField, StyledLoginButton } from "@/components/styled";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

import Swal from "sweetalert2";
import { sendResetPasswordEmail } from "@/lib/email";
import { toast } from "react-toastify";
import { ResetPasswordRequest } from "@/model/request-reset-password/interface";

interface ResetPasswordModalProps {
  open: boolean;
  isLoggedIn: boolean;
  currentUserEmail?: string;
  onClose: () => void;
}

interface ResetPasswordResponse {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    phone_number: string | null;
    status: string;
    role_id: number;
  };
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  open,
  isLoggedIn = false,
  currentUserEmail = "",
  onClose,
}) => {
  const [email, setEmail] = useState(currentUserEmail || "");
  const theme = useTheme();

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  const requestResetMutation = useMutation<
    ResetPasswordResponse,
    any,
    ResetPasswordRequest
  >({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await api.requestPasswordReset(data);
      if (!response || !response.recoveryEmail) {
        toast.error(
          "Unable to find user with this email. Try a different one."
        );
      }
      await sendResetPasswordEmail(response.recoveryEmail, response.acessToken);
      return response;
    },
    onSuccess: (data: any) => {
      toast.success(
        `Password reset link sent to ${data.recoveryEmail}. Please check your inbox.`
      );
      handleClose();
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to send reset link. Please try again later."
      );
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email.");
      return;
    }

    requestResetMutation.mutate({
      recoveryEmail: email,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "8px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "16px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Reset Password
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "#666",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ paddingTop: "8px !important" }}>
        <Box component="form" onSubmit={handleEmailSubmit}>
          {isLoggedIn ? (
            <Typography sx={{ marginBottom: "26px" }}>
              Are you sure you want to reset your password? A reset link will be
              sent to your registered email address.
            </Typography>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  color: "#6c757d",
                  marginBottom: "24px",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                Enter your email address and we'll send you a link to reset your
                password.
              </Typography>

              <Box sx={{ marginBottom: "24px" }}>
                <StyledLoginTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  variant="outlined"
                  size="medium"
                  disabled={requestResetMutation.isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: "#6c757d", fontSize: "20px" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          )}
          <StyledLoginButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={requestResetMutation.isPending}
            sx={{ marginBottom: "16px" }}
          >
            {requestResetMutation.isPending ? (
              <>
                <CircularProgress
                  size={20}
                  sx={{ marginRight: "8px", color: "white" }}
                />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </StyledLoginButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
