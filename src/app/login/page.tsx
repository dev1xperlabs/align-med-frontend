"use client";

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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  StyledLoginCard,
  StyledLoginTextField,
  StyledLoginButton,
  StyledLoginBackground,
} from "@/components/styled";
import { AlignLogo } from "@/components/common/LogoComponent";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { useAuth } from "@/components/auth/useAuth";
import Swal from "sweetalert2";

import type { ApiError } from "next/dist/server/api-utils";
import { iLoginBody } from "./interfaces/iUserInterface";
import { AuthResponse } from "@/model/auth/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const theme = useTheme();

  const loginMutation = useMutation<AuthResponse, ApiError, iLoginBody>({
    mutationFn: (loginData: iLoginBody) => api.authLogin(loginData),
    onSuccess: (data) => {
      console.log("Login API successful:", data);
      console.log("AccessToken:", data.accessToken);
      console.log("User:", data.user);
      debugger;
      // Call the login function from useAuth with the correct field names
      login(data.accessToken, data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password. Please try again.",
        confirmButtonColor: theme.palette.primary.main,
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
        confirmButtonColor: theme.palette.primary.main,
      });
      return;
    }
    loginMutation.mutate(formData);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
                variant="body1"
                align="center"
                sx={{
                  color: "#6c757d",
                  marginBottom: "32px",
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Login to your account
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: "24px" }}>
                  <StyledLoginTextField
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="balemia@gmail.com"
                    value={formData.email}
                    onChange={handleChange("email")}
                    variant="outlined"
                    size="medium"
                    disabled={loginMutation.isPending}
                  />
                </Box>

                <Box sx={{ marginBottom: "32px" }}>
                  <StyledLoginTextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    variant="outlined"
                    size="medium"
                    disabled={loginMutation.isPending}
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
                </Box>

                <StyledLoginButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </StyledLoginButton>

                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#6c757d", fontSize: "14px" }}
                  >
                    Don't have an account?{" "}
                    <Box
                      component="a"
                      href="/signup"
                      sx={{
                        color: theme.palette.primary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Sign up here
                    </Box>
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

export default LoginPage;
