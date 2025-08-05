"use client"

import { Box, Skeleton, Card, CardContent } from "@mui/material"

// Simple table data skeleton - only the data rows
export const TableDataSkeleton = () => (
  <Box>
    {Array.from({ length: 8 }).map((_, row) => (
      <Box
        key={row}
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          "&:nth-of-type(even)": { bgcolor: "#fafafa" },
        }}
      >
        {Array.from({ length: 6 }).map((_, col) => (
          <Skeleton key={col} variant="text" width={120} height={20} />
        ))}
      </Box>
    ))}
  </Box>
)

// Simple chart skeleton - only the chart area
export const ChartDataSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 1 }} />

    {/* Legend */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={12} height={12} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      ))}
    </Box>
  </Box>
)

export const TableSkeleton = () => (
  <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
    <CardContent sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Table Header */}
      <Box sx={{ bgcolor: "#333", p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="text" width={120} height={24} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
          ))}
        </Box>
      </Box>

      {/* Table Rows */}
      <TableDataSkeleton />

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Skeleton variant="text" width={150} height={20} />
        <Box sx={{ display: "flex", gap: 1 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="circular" width={32} height={32} />
          ))}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export const ChartSkeleton = () => (
  <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
    <CardContent sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Chart Area */}
      <ChartDataSkeleton />
    </CardContent>
  </Card>
)

// Add a new skeleton specifically for settlements (without data type toggle)
export const SettlementsTableSkeleton = () => (
  <Box>
    {/* SimpleToggles Skeleton for Settlements (no data type toggle) */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 3,
        width: "100%",
        marginTop: 4,
        marginBottom: 4,
        "@media (max-width: 900px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {/* Group By Toggle (spans 2 columns) */}
      <Box
        sx={{
          gridColumn: "span 2",
          "@media (max-width: 900px)": { gridColumn: "span 2" },
          "@media (max-width: 600px)": { gridColumn: "span 1" },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: "6px" }} />
      </Box>

      {/* Empty space where data type toggle would be */}
      <Box sx={{ gridColumn: "span 1" }}>{/* Empty space */}</Box>

      {/* View Type Toggle (always 4th column) */}
      <Box
        sx={{
          gridColumn: "4 / 5",
          "@media (max-width: 900px)": { gridColumn: "2 / 3" },
          "@media (max-width: 600px)": { gridColumn: "span 1" },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: "6px" }} />
      </Box>
    </Box>

    {/* Table Card */}
    <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>

        {/* Table Header */}
        <Box sx={{ bgcolor: "#333", p: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="text" width={120} height={24} sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
            ))}
          </Box>
        </Box>

        {/* Table Rows */}
        <TableDataSkeleton />

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Skeleton variant="text" width={150} height={20} />
          <Box sx={{ display: "flex", gap: 1 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="circular" width={32} height={32} />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Box>
)

export const SettlementsChartSkeleton = () => (
  <Box>
    {/* SimpleToggles Skeleton for Settlements (no data type toggle) */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 3,
        width: "100%",
        marginTop: 4,
        marginBottom: 4,
        "@media (max-width: 900px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (max-width: 600px)": {
          gridTemplateColumns: "1fr",
        },
      }}
    >
      {/* Group By Toggle (spans 2 columns) */}
      <Box
        sx={{
          gridColumn: "span 2",
          "@media (max-width: 900px)": { gridColumn: "span 2" },
          "@media (max-width: 600px)": { gridColumn: "span 1" },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: "6px" }} />
      </Box>

      {/* Empty space where data type toggle would be */}
      <Box sx={{ gridColumn: "span 1" }}>{/* Empty space */}</Box>

      {/* View Type Toggle (always 4th column) */}
      <Box
        sx={{
          gridColumn: "4 / 5",
          "@media (max-width: 900px)": { gridColumn: "2 / 3" },
          "@media (max-width: 600px)": { gridColumn: "span 1" },
        }}
      >
        <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: "6px" }} />
      </Box>
    </Box>

    {/* Chart Card */}
    <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 0 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="rectangular" width={200} height={40} sx={{ borderRadius: 1 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
          </Box>
        </Box>

        {/* Chart Area */}
        <ChartDataSkeleton />
      </CardContent>
    </Card>
  </Box>
)
