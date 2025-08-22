"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CardContent,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  ArrowBack,
} from "@mui/icons-material";
import {
  StyledLoginCard,
  StyledLoginTextField,
  StyledLoginButton,
  StyledLoginBackground,
} from "@/components/styled";
import { AlignLogo } from "@/components/common/LogoComponent";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Swal from "sweetalert2";
import { ForgotPasswordDto } from "./interfaces/interfaces";
import { toast } from "react-toastify";
import { useAuth } from "@/components/auth/useAuth";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();

  const validateTokenMutation = useMutation<boolean, any, { token: string }>({
    mutationFn: ({ token }) => api.validateToken({ token }),
    onSuccess: (isValid) => {
      if (isValid) {
        setToken(searchParams.get("token")!);
        setIsValidating(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Token",
          text: "Your reset password link has expired or is invalid.",
          confirmButtonColor: theme.palette.primary.main,
        }).then(() => {
          router.push("/login");
        });
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to validate the reset token.",
        confirmButtonColor: theme.palette.primary.main,
      }).then(() => {
        router.push("/login");
      });
    },
  });

  useEffect(() => {
    logout(false);
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "This reset password link is invalid or missing token.",
        confirmButtonColor: theme.palette.primary.main,
      }).then(() => {
        router.push("/login");
      });
    } else {
      validateTokenMutation.mutate({ token: tokenFromUrl });
    }
  }, [searchParams, router, theme.palette.primary.main]);

  const resetPasswordMutation = useMutation<any, any, ForgotPasswordDto>({
    mutationFn: (data: ForgotPasswordDto) => api.forgotPassword(data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful!",
        text: "Your password has been reset successfully. You can now login with your new password.",
        confirmButtonColor: theme.palette.primary.main,
      }).then(() => {
        router.push("/login");
      });
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          "Failed to reset password. The token may be expired or invalid. Please request a new reset link.",
        {
          toastId: 1,
        }
      );
    },
  });

  const handleChange =
    (field: string) => (event: { target: { value: any } }) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in both password fields.", {
        toastId: 2,
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords Don't Match", {
        toastId: 3,
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        toastId: 4,
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Invalid Token",
        text: "Reset token is missing. Please request a new reset link.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    resetPasswordMutation.mutate({
      access_token: token,
      password: formData.newPassword,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  if (isValidating) {
    return (
      <StyledLoginBackground>
        <Container maxWidth="sm">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <CircularProgress size={50} />
          </Box>
        </Container>
      </StyledLoginBackground>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <StyledLoginBackground>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center">
          <StyledLoginCard>
            <CardContent sx={{ padding: "48px 40px !important" }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& > div": {
                    height: "84px !important",
                    justifyContent: "center !important",
                  },
                }}
              >
                <AlignLogo width={212} height={84} collapsed={true} />
              </Box>

              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: "#333",
                  marginBottom: "8px",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                Reset Your Password
              </Typography>

              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: "#6c757d",
                  marginBottom: "32px",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Enter your new password below
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "24px" }}>
                  <StyledLoginTextField
                    fullWidth
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={formData.newPassword}
                    onChange={handleChange("newPassword")}
                    variant="outlined"
                    size="medium"
                    disabled={resetPasswordMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#6c757d", fontSize: "20px" }} />
                        </InputAdornment>
                      ),
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
                </Box>

                <Box sx={{ marginBottom: "32px" }}>
                  <StyledLoginTextField
                    fullWidth
                    label="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    variant="outlined"
                    size="medium"
                    disabled={resetPasswordMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#6c757d", fontSize: "20px" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            size="small"
                            sx={{
                              color: "#6c757d",
                              "&:hover": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <StyledLoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={resetPasswordMutation.isPending}
                  sx={{ marginBottom: "24px" }}
                >
                  {resetPasswordMutation.isPending ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ marginRight: "8px", color: "white" }}
                      />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </StyledLoginButton>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    component="button"
                    type="button"
                    onClick={handleBackToLogin}
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      fontWeight: 500,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      margin: "0 auto",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    <ArrowBack sx={{ fontSize: "16px" }} />
                    Back to Login
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledLoginCard>
        </Box>
      </Container>
    </StyledLoginBackground>
  );
};

export default ResetPasswordPage;
