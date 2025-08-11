"use client";

import type React from "react";
import { Box } from "@mui/material";
import { MetricCard, type MetricData } from "./MetricCard";

interface MetricsGridProps {
  data: MetricData[];
  gap?: number;
  sx?: object;
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({
  data,
  gap = 3,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gap: gap,
        width: "100%",
        marginTop: 2,

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: `repeat(${Math.min(data.length, 4)}, 1fr)`,
        },
        ...sx,
      }}
    >
      {data.map((metric, index) => (
        <MetricCard
          key={`${metric.title}-${index}`}
          {...metric}
          sx={{ minHeight: 150 }}
        />
      ))}
    </Box>
  );
};
