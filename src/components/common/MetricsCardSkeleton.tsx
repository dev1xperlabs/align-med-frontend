"use client";

import type React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";

interface MetricsCardSkeletonProps {
  count?: number;
}

export const MetricsCardSkeleton: React.FC<MetricsCardSkeletonProps> = ({
  count = 4,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${count}, 1fr)`,
        gap: 3,
        width: "100%",
        marginTop: 2,

        "@media (max-width: 900px)": {
          gridTemplateColumns:
            count > 2 ? "repeat(2, 1fr)" : `repeat(${count}, 1fr)`,
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {/* Title skeleton */}
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />

              {/* Value skeleton */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <Skeleton variant="text" width="40%" height={48} />

                {/* Trend skeleton */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Skeleton variant="circular" width={16} height={16} />
                  <Skeleton variant="text" width={30} height={16} />
                </Box>
              </Box>

              {/* Route display skeleton */}
              <Skeleton variant="text" width="80%" height={16} sx={{ mt: 1 }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
