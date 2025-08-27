"use client";

import type React from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { green, red, grey } from "@mui/material/colors";
import { MuiRouteDisplay } from "./route-display-mui";

export interface MetricData {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  unit?: string;
  customSubText?: string;
}

interface MetricCardProps extends MetricData {
  sx?: object;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = "neutral",
  unit = "",
  customSubText,
  sx = {},
}) => {
  const formatChange = (change: number) => {
    return `${Math.abs(change)}%`;
  };

  const theme = useTheme();
  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return green[600];
      case "down":
        return red[600];
      default:
        return grey[500];
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    const iconProps = {
      sx: { fontSize: 16, color: getTrendColor(trend) },
    };

    switch (trend) {
      case "up":
        return <TrendingUp {...iconProps} />;
      case "down":
        return <TrendingDown {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ height: "100%", ...sx }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ fontWeight: 400, fontSize: "1rem" }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: "2.5rem",
                "@media (max-width: 1366px)": {
                  fontSize: "1.8rem",
                },
              }}
            >
              {value}
              {unit}
            </Typography>

            {change !== undefined && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: getTrendColor(trend),
                }}
              >
                {getTrendIcon(trend)}
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: getTrendColor(trend),
                  }}
                >
                  {formatChange(change)}
                </Typography>
              </Box>
            )}
          </Box>

          {customSubText ? (
            <Typography
              sx={{
                fontWeight: 500,
                color: "grey.600",
                fontSize: "12px",
              }}
            >
              {customSubText}
            </Typography>
          ) : (
            <MuiRouteDisplay
              sx={{
                fontWeight: 500,
                color: "grey.600",
                fontSize: "12px",
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
