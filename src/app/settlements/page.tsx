"use client";

import { useState, useMemo, useCallback } from "react";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { DashboardLayout } from "@/components/dahboard/Dashboard-layout";
import { MetricsGrid } from "@/components/common/MetricsGrid";
import { MetricsCardSkeleton } from "@/components/common/MetricsCardSkeleton";
import GenericTable from "@/components/common/CustomTable";

import { api } from "../../lib/api";
import { transformSettlementsBillingCards } from "@/utils/metrics-helpers";
import {
  getApiGroupBy,
  getDateRange,
  getDateRangeFromGroupBy,
} from "@/utils/date-helpers";
import type { iAttorney } from "@/model/attorneys/attorneys";

interface FilterConfig {
  key: string;
  label: string;
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple?: boolean;
}

export default function SettlementsPage() {
  const [groupBy, setGroupBy] = useState<"month" | "attorneys">("month");
  const [viewType, setViewType] = useState<"table" | "graph">("table");

  const [groupByPeriod, setGroupByPeriod] = useState<string>("Week");

  const [dateRange, setDateRange] = useState<string>("This Year");
  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data: metricsData, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ["settlementsBillingCards"],
    queryFn: () => api.getSettlementsBillingCards(),
    select: transformSettlementsBillingCards,
  });

  const { data: attorneysList = [], isLoading: isLoadingAttorneys } = useQuery<
    iAttorney[],
    Error
  >({
    queryKey: ["attorneys"],
    queryFn: () => api.getAttorneys(),
  });

  const attorneyNameToIdMap = useMemo(() => {
    return new Map(attorneysList.map((a) => [a.name, a.id]));
  }, [attorneysList]);

  const attorneyOptions = useMemo(
    () =>
      attorneysList
        ?.slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((a) => a.name),
    [attorneysList]
  );

  const requestBody = useMemo(() => {
    let dateRangeData;

    if (groupBy === "month") {
      dateRangeData = getDateRangeFromGroupBy(
        groupByPeriod,
        startDate,
        endDate
      );
    } else if (dateRange === "Custom" && startDate && endDate) {
      dateRangeData = {
        start_date: startDate,
        end_date: endDate,
      };
    } else {
      dateRangeData = getDateRange(dateRange);
    }

    const baseBody = {
      page_number: page,
      page_size: pageSize,
      start_date: dateRangeData.start_date,
      end_date: dateRangeData.end_date,
    };

    if (groupBy === "month") {
      return {
        ...baseBody,
        group_by: getApiGroupBy(groupByPeriod),
      };
    }

    if (groupBy === "attorneys") {
      const attorney_ids = selectedAttorneys
        .map((name) => attorneyNameToIdMap.get(name))
        .filter(Boolean) as number[];

      return attorney_ids.length > 0 ? { ...baseBody, attorney_ids } : baseBody;
    }

    return baseBody;
  }, [
    page,
    pageSize,
    groupByPeriod,
    dateRange,
    groupBy,
    selectedAttorneys,
    attorneyNameToIdMap,
    startDate,
    endDate,
  ]);

  const {
    data: settlementsData,
    isLoading: isLoadingSettlements,
    error: settlementsError,
  } = useQuery({
    queryKey: [
      "settlements",
      groupBy,
      groupBy === "month" ? groupByPeriod : dateRange,
      selectedAttorneys,
      page,
      pageSize,
      startDate,
      endDate,
    ],
    queryFn: () => {
      if (groupBy === "month") {
        return api.getSettlementsByDate(requestBody);
      } else {
        return api.getSettlementsByAttorney(requestBody);
      }
    },
    select: (data) => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return { results: [], count: 0, primaryKey: "", columns: [] };
      }

      const responseData = data[0];
      const results = responseData.data || [];
      const count = responseData.totalRecords || 0;

      let primaryKey = "";
      let columns: string[] = [];

      if (results.length > 0) {
        if (groupBy === "month") {
          primaryKey = "period";
          columns = [
            "patient_count",
            "total_billed_charges",
            "total_settlement_amount",
            "avg_settlement_percentage",
          ];
        } else {
          primaryKey = "attorney";
          const allKeys = results.reduce(
            (acc: string[], row: any) => [
              ...acc,
              ...Object.keys(row as object),
            ],
            []
          );
          columns = [...(new Set(allKeys) as Set<string>)].filter(
            (key) => key !== primaryKey
          );
        }
      }

      if (groupBy === "attorneys") {
        columns.sort(
          (a, b) =>
            Number.parseInt(b.split(" ")[1]) - Number.parseInt(a.split(" ")[1])
        );
      }
      return { results, count, primaryKey, columns };
    },
    enabled: !isLoadingAttorneys,
  });

  const currentData = useMemo(
    () => settlementsData?.results || [],
    [settlementsData]
  );
  const totalRecords = useMemo(
    () => settlementsData?.count || 0,
    [settlementsData]
  );

  const columnLabels = {
    period: "Period",
    attorney: "Attorney",
    patient_count: "Patient Count",
    total_billed_charges: "Total Billed Charges",
    total_settlement_amount: "Total Settlement Amount",
    avg_settlement_percentage: "Avg Settlement %",
  };

  const groupByOptions = [
    {
      value: "month",
      label: groupBy === "month" ? `By ${groupByPeriod}` : "By Date",
    },
    { value: "attorneys", label: "By Attorneys" },
  ];

  const filters: FilterConfig[] = useMemo(() => {
    const baseFilters: FilterConfig[] = [];

    if (groupBy === "attorneys") {
      baseFilters.push({
        key: "attorney",
        label: "Attorneys",
        options: attorneyOptions,
        value: selectedAttorneys,
        onChange: (value: string | string[]) => {
          setSelectedAttorneys(Array.isArray(value) ? value : [value]);
          setPage(1);
        },
        isMultiple: true,
      });
    }

    if (groupBy === "month") {
      baseFilters.push({
        key: "groupByPeriod",
        label: "Group By",
        options: ["Year", "Month", "Week", "Date"],
        value: groupByPeriod,
        onChange: (val: string | string[]) => {
          setGroupByPeriod(Array.isArray(val) ? val[0] : val);
          setPage(1);
        },
        isMultiple: false,
      });
    } else {
      baseFilters.push({
        key: "dateRange",
        label: "Date Range",
        options: ["Today", "This Week", "This Month", "This Year", "Custom"],
        value: dateRange,
        onChange: (val: string | string[]) => {
          const newDateRange = Array.isArray(val) ? val[0] : val;
          setDateRange(newDateRange);
          setPage(1);

          if (newDateRange !== "Custom") {
            setStartDate("");
            setEndDate("");
          }
        },
        isMultiple: false,
      });
    }

    return baseFilters;
  }, [groupBy, groupByPeriod, dateRange, selectedAttorneys, attorneyOptions]);

  const handleStartDateChange = useCallback((date: string) => {
    setStartDate(date);
    setPage(1);
  }, []);

  const handleEndDateChange = useCallback((date: string) => {
    setEndDate(date);
    setPage(1);
  }, []);

  const displayDates = useMemo(() => {
    if (dateRange === "Custom") {
      return { startDate, endDate };
    }

    if (groupBy === "month") {
      const dateRangeData = getDateRangeFromGroupBy(
        groupByPeriod,
        startDate,
        endDate
      );
      return {
        startDate: dateRangeData.start_date,
        endDate: dateRangeData.end_date,
      };
    } else {
      const dateRangeData = getDateRange(dateRange);
      return {
        startDate: dateRangeData.start_date,
        endDate: dateRangeData.end_date,
      };
    }
  }, [dateRange, groupBy, groupByPeriod, startDate, endDate]);

  const handleGroupByChange = useCallback((value: string) => {
    setGroupBy(value as "month" | "attorneys");
    setPage(1);
    setSelectedAttorneys([]);
  }, []);

  const handleViewTypeChange = useCallback((val: "table" | "graph") => {
    setViewType(val);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage + 1);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  }, []);

  const chartColors = useMemo(() => {
    const baseColors = {
      patient_count: "#2196F3",
      total_billed_charges: "#FF9800",
      total_settlement_amount: "#4CAF50",
      avg_settlement_percentage: "#E91E63",
    };

    if (groupBy === "attorneys" && currentData.length > 0) {
      const palette = [
        "#E91E63",
        "#FF9800",
        "#9C27B0",
        "#2196F3",
        "#4CAF50",
        "#FF5722",
        "#607D8B",
        "#795548",
      ];

      const dynamicColors: Record<string, string> = {};
      currentData.forEach(
        (row: { attorney: string | number }, index: number) => {
          if (row.attorney) {
            dynamicColors[row.attorney] = palette[index % palette.length];
          }
        }
      );

      return { ...baseColors, ...dynamicColors };
    }

    return baseColors;
  }, [groupBy, currentData]);

  const isMetricsLoading = isLoadingMetrics;
  const isTableDataLoading = isLoadingSettlements || isLoadingAttorneys;

  return (
    <DashboardLayout>
      <Box>
        {isMetricsLoading ? (
          <MetricsCardSkeleton />
        ) : (
          <MetricsGrid data={metricsData || []} sx={{ mb: 2 }} />
        )}

        {settlementsError && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: "error.light",
              color: "error.dark",
              borderRadius: 1,
            }}
          >
            {(settlementsError as any)?.message || "Failed to load settlements"}
          </Box>
        )}

        <GenericTable
          data={currentData}
          primaryKey={settlementsData?.primaryKey || "period"}
          dataColumns={settlementsData?.columns || []}
          columnLabels={columnLabels}
          groupByOptions={groupByOptions}
          groupBy={groupBy}
          onGroupByChange={handleGroupByChange}
          filters={filters}
          chartColors={chartColors}
          hideDataTypeToggle={true}
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
          currentPage={page - 1}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageType="settlements"
          isLoading={isTableDataLoading}
          dateRange={dateRange}
          startDate={displayDates.startDate}
          endDate={displayDates.endDate}
          onDateRangeChange={setDateRange}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      </Box>
    </DashboardLayout>
  );
}
