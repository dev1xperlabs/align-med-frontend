"use client";

import type React from "react";

import { useState } from "react";
import {
  CardContent,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
} from "@mui/icons-material";
import {
  StyledSignupCard,
  StyledSignupTextField,
  StyledSignupButton,
  StyledLoginBackground,
} from "@/components/styled";
import { AlignLogo } from "@/components/common/LogoComponent";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import type { ApiError } from "next/dist/server/api-utils";

import { AuthResponse } from "@/model/auth/auth";
import { iRegisterBody } from "./interface/iRegister";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const registerMutation = useMutation<AuthResponse, ApiError, iRegisterBody>({
    mutationFn: (authRegister: iRegisterBody) => api.authRegister(authRegister),
    onSuccess: (data) => {
      console.log("Sign Up successful:", data);
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully. Please login to continue.",
        confirmButtonColor: theme.palette.primary.main,
      }).then(() => {
        router.push("/login");
      });
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Failed to create account. Please try again.",
        confirmButtonColor: "#d33",
      });
    },
  });

  const handleChange =
    (field: string) => (event: { target: { value: any } }) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please confirm your password correctly.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    const [firstName, ...rest] = fullName.trim().split(" ");
    const lastName = rest.join(" ") || "";

    if (!firstName || !lastName) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Full Name",
        text: "Please enter both first and last names.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }

    const req = {
      phoneNumber: "+923330363987",
      status: true,
    };
    const payload = {
      firstName,
      lastName,
      email,
      password,
      ...req,
    };
    registerMutation.mutate(payload);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <StyledLoginBackground>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center">
          <StyledSignupCard>
            <CardContent sx={{ padding: "48px 48px 40px 48px !important" }}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mb: 1,
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
                  color: "#2c3e50",
                  marginBottom: "8px",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                Create Account
              </Typography>

              <Typography
                variant="body1"
                align="center"
                sx={{
                  color: "#6c757d",
                  marginBottom: "36px",
                  fontSize: "15px",
                  fontWeight: 400,
                }}
              >
                Join us today and get started
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "24px" }}>
                  <StyledSignupTextField
                    fullWidth
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange("fullName")}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: "20px",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: "24px" }}>
                  <StyledSignupTextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: "20px",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ marginBottom: "24px" }}>
                  <StyledSignupTextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: "20px",
                            }}
                          />
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
                  <StyledSignupTextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    variant="outlined"
                    disabled={registerMutation.isPending}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: "20px",
                            }}
                          />
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

                <StyledSignupButton
                  type="submit"
                  fullWidth
                  size="large"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </StyledSignupButton>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6c757d", fontSize: "15px" }}
                  >
                    Already have an account?{" "}
                    <Box
                      component="a"
                      href="/login"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign in here
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </StyledSignupCard>
        </Box>
      </Container>
    </StyledLoginBackground>
  );
};

export default SignupPage;
