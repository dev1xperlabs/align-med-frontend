"use client";

import type React from "react";
import { useRef, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BaseDataRow {
  [key: string]: string | number;
}

interface ChartComponentProps {
  data: BaseDataRow[];
  primaryKey: string;
  dataColumns: string[];
  columnLabels?: Record<string, string>;
  dataType?: "sum" | "count";
  colors?: Record<string, string>;
  pageType?: "patient-intake" | "settlements";
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  primaryKey,
  dataColumns,
  columnLabels = {},
  dataType = "sum",
  colors = {},
  pageType = "patient-intake",
}) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new window.ResizeObserver(() => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const defaultColors = {
    0: "#E91E63", // Pink/Magenta
    1: "#FF9800", // Orange
    2: "#9C27B0", // Purple
    3: "#2196F3", // Blue
    4: "#4CAF50", // Green
    5: "#FF5722", // Deep Orange
    6: "#607D8B", // Blue Grey
    7: "#795548", // Brown
  };

  // Helper function to parse formatted values from backend
  const parseValue = (value: any): number => {
    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "string") {
      // Handle percentage values (e.g., "50.56%")
      if (value.includes("%")) {
        return Number.parseFloat(value.replace("%", "")) || 0;
      }

      // Handle currency values (e.g., "$20423", "$131945.57")
      if (value.includes("$")) {
        return Number.parseFloat(value.replace(/[$,]/g, "")) || 0;
      }

      // Handle plain string numbers
      return Number.parseFloat(value) || 0;
    }

    return 0;
  };

  const chartData = useMemo(() => {
    if (!data.length) return { labels: [], datasets: [] };

    console.log("Chart data input:", data);

    // Check if this is settlements attorney data (has attorney as primaryKey)
    const isSettlementsAttorneyData =
      primaryKey === "attorney" && pageType === "settlements";

    // Check if this is patient intake attorney data
    const isPatientIntakeAttorneyData =
      primaryKey === "attorney" && pageType === "patient-intake";

    if (isSettlementsAttorneyData || isPatientIntakeAttorneyData) {
      // For both settlements and patient intake attorney data, we need to transpose the data
      // X-axis should be dates, Y-axis should be values, and each attorney should be a separate line

      // Get all unique dates from all attorney objects
      const allDates = new Set<string>();
      data.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (key !== "attorney") {
            allDates.add(key);
          }
        });
      });

      const isWeekLabel = (label: string) => /^Week\s\d+$/i.test(label);

      const sortedDates = Array.from(allDates).sort((a, b) => {
        if (isWeekLabel(a) && isWeekLabel(b)) {
          const aNum = parseInt(a.replace("Week ", ""));
          const bNum = parseInt(b.replace("Week ", ""));
          return aNum - bNum;
        }
        // Default fallback for non-week labels (use string sort)
        return a.localeCompare(b);
      });

      const labels = sortedDates.map((label) => label);
      // Format dates for display

      // Create datasets - one for each attorney
      const datasets = data.map((attorney, index) => {
        const attorneyName = attorney.attorney as string;
        const color =
          colors[attorneyName] ||
          defaultColors[index as keyof typeof defaultColors] ||
          "#666666";

        // Get values for each date and parse them properly
        const attorneyData = sortedDates.map((date) => {
          const value = attorney[date];
          return parseValue(value);
        });

        return {
          label: attorneyName,
          data: attorneyData,
          borderColor: color,
          backgroundColor: color + "20",
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3,
        };
      });

      return { labels, datasets };
    } else {
      // Original logic for location data and settlements by month/week/year
      const labels = data.map((item) => {
        const value = item[primaryKey];
        if (typeof value === "string" && value.includes("/")) {
          try {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
          } catch {
            return value;
          }
        }
        return String(value);
      });

      // ONLY filter columns for CHARTS on settlements page
      let filteredColumns = dataColumns;
      if (pageType === "settlements" && primaryKey !== "attorney") {
        // For settlements charts (not attorney view), exclude patient_count and total_billed_charges
        filteredColumns = dataColumns.filter(
          (column) =>
            column !== "patient_count" && column !== "total_billed_charges"
        );
      }

      const datasets = filteredColumns.map((column, index) => {
        const label = columnLabels[column] || column;
        const color =
          colors[column] ||
          defaultColors[index as keyof typeof defaultColors] ||
          "#666666";

        // Parse the data values properly
        const chartData = data.map((item) => {
          const value = item[column];
          if (value === "-" || value === null || value === undefined) {
            return 0; // or null if you want gaps in the line
          }
          return parseValue(value);
        });

        return {
          label: label,
          data: chartData,
          borderColor: color,
          backgroundColor: color + "20",
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3,
          yAxisID:
            pageType === "settlements" &&
            column.toLowerCase().includes("percentage")
              ? "y1"
              : "y",
        };
      });

      console.log(labels, "Chart labels");
      return { labels, datasets };
    }
  }, [
    data,
    primaryKey,
    dataColumns,
    columnLabels,
    colors,
    defaultColors,
    pageType,
  ]);

  const needsDualYAxis = useMemo(() => {
    return (
      pageType === "settlements" &&
      dataColumns.some((col) => col.toLowerCase().includes("percentage"))
    );
  }, [pageType, dataColumns]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: "point",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return context[0]?.label || "";
          },
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;

            if (pageType === "patient-intake") {
              if (dataType === "count") {
                return `${label}: ${value} ${
                  value === 1 ? "Patient" : "Patients"
                }`;
              } else {
                return `${label}: ${value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}`;
              }
            } else if (pageType === "settlements") {
              // For settlements, check if it's percentage
              if (
                label.toLowerCase().includes("percentage") ||
                context.dataset.yAxisID === "y1"
              ) {
                return `${label}: ${value}%`;
              } else {
                // Format as currency
                return `${label}: ${value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}`;
              }
            }

            return `${label}: ${value.toLocaleString()}`;
          },
          labelColor: (context) => {
            return {
              borderColor: context.dataset.borderColor as string,
              backgroundColor: context.dataset.borderColor as string,
            };
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        grid: {
          color: "#f0f0f0",
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: (value) => {
            const numValue = Number(value);

            if (pageType === "patient-intake") {
              if (dataType === "count") {
                return numValue.toLocaleString();
              } else {
                if (numValue >= 1000000) {
                  return `$${(numValue / 1000000).toFixed(1)}M`;
                } else if (numValue >= 1000) {
                  return `$${(numValue / 1000).toFixed(1)}K`;
                }
                return `$${numValue.toLocaleString()}`;
              }
            }

            if (numValue >= 1000000) {
              return `$${(numValue / 1000000).toFixed(1)}M`;
            } else if (numValue >= 1000) {
              return `$${(numValue / 1000).toFixed(1)}K`;
            }
            return `$${numValue.toLocaleString()}`;
          },
        },
      },

      ...(needsDualYAxis && {
        y1: {
          type: "linear",
          display: true,
          position: "right",
          beginAtZero: true,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            font: {
              size: 11,
            },
            callback: (value: any) => {
              return `${value}%`;
            },
          },
        },
      }),
    },
    interaction: {
      mode: "point",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
      },
      line: {
        borderWidth: 2,
      },
    },
    onHover: (event, activeElements) => {
      if (event.native?.target) {
        const target = event.native.target as HTMLElement;
        target.style.cursor = activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <Box ref={containerRef} sx={{ height: 400, width: "100%" }}>
      <Line
        ref={(node) => {
          if (node) {
            chartRef.current = node;
          }
        }}
        data={chartData}
        options={options}
      />
    </Box>
  );
};

export default ChartComponent;
