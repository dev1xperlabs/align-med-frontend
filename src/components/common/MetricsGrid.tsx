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
  const gridColumns = data.length;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gap: gap,
        width: "100%",
        marginTop: 2,

        "@media (max-width: 900px)": {
          gridTemplateColumns:
            data.length > 2 ? "repeat(2, 1fr)" : `repeat(${gridColumns}, 1fr)`,
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr",
        },
        ...sx,
      }}
    >
      {data.map((metric, index) => (
        <MetricCard
          key={`${metric.title}-${index}`}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
          unit={metric.unit}
          customSubText={metric.customSubText}
        />
      ))}
    </Box>
  );  
};
