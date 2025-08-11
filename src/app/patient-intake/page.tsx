"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dahboard/Dashboard-layout";
import { Box } from "@mui/material";
import { MetricsGrid } from "@/components/common/MetricsGrid";
import { MetricsCardSkeleton } from "@/components/common/MetricsCardSkeleton";
import GenericTable from "@/components/common/CustomTable";
import { api } from "../../lib/api";
import {
  transformPatientCountData,
  transformBillingData,
} from "@/utils/metrics-helpers";
import { getDateRange } from "@/utils/date-helpers";
import { defaultChartColors } from "@/utils/chart-colors";
import { iAttorney } from "@/model/attorneys/attorneys";

const getApiFunction = (groupBy: string, metricType: "sum" | "count") => {
  if (groupBy === "locations") {
    return metricType === "count"
      ? api.getCountOfNewPatientsByLocation
      : api.getSumOfNewPatientsByLocation;
  }

  return metricType === "count"
    ? api.getCountOfNewPatientsByAttorney
    : api.getSumOfNewPatientsByAttorney;
};

export default function PatientIntakePage() {
  const [groupBy, setGroupBy] = useState("locations");
  const [metricType, setMetricType] = useState<"sum" | "count">("count");
  const [dateRange, setDateRange] = useState("This Year");
  const [selectedAttorneys, setSelectedAttorneys] = useState<string[]>([]);
  const [viewType, setViewType] = useState<"table" | "graph">("table");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
    const attorney_ids = selectedAttorneys
      .map((name) => attorneyNameToIdMap.get(name))
      .filter(Boolean);

    const dateRangeData = getDateRange(dateRange);

    return {
      page_number: page,
      page_size: pageSize,
      start_date: dateRangeData.start_date,
      end_date: dateRangeData.end_date,
      ...(groupBy === "attorneys" &&
        attorney_ids.length > 0 && { attorney_ids }),
    };
  }, [
    page,
    pageSize,
    dateRange,
    groupBy,
    selectedAttorneys,
    attorneyNameToIdMap,
  ]);

  const {
    data: tableData,
    isLoading: isLoadingTable,
    error: tableError,
  } = useQuery({
    queryKey: ["patientIntakeData", groupBy, metricType, requestBody],
    queryFn: () => {
      const apiFn = getApiFunction(groupBy, metricType);
      return apiFn(requestBody);
    },
    select: (data) => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return { results: [], count: 0, primaryKey: "", columns: [] };
      }
      console.log(data, "dsada");
      const responseData = data[0];
      const dataKey = Object.keys(responseData).find((k) =>
        Array.isArray(responseData[k])
      );

      if (!dataKey) {
        return { results: [], count: 0, primaryKey: "", columns: [] };
      }

      const results = responseData[dataKey] || [];
      const count = responseData.totalRecords || 0;

      let primaryKey = "";
      let columns: string[] = [];

      if (results.length > 0) {
        primaryKey = groupBy === "locations" ? "date" : "attorney";
        const allKeys = results.reduce(
          (acc: any, row: {}) => [...acc, ...Object.keys(row)],
          [] as string[]
        );
        columns = ([...new Set(allKeys)] as string[]).filter(
          (key) => key !== primaryKey
        );
      }

      return { results, count, primaryKey, columns };
    },
    enabled: !isLoadingAttorneys,
  });

  const { data: patientStats, isLoading: isLoadingPatientStats } = useQuery({
    queryKey: ["patientStatistics"],
    queryFn: api.getPatientsStatistics,
    select: transformPatientCountData,
  });

  const { data: billingStats, isLoading: isLoadingBillingStats } = useQuery({
    queryKey: ["billingSummary"],
    queryFn: api.getBillingSummary,
    select: transformBillingData,
  });

  const metricsData = useMemo(() => {
    return metricType === "count" ? patientStats : billingStats;
  }, [metricType, patientStats, billingStats]);

  const handleGroupByChange = (value: string) => {
    setGroupBy(value);
    setSelectedAttorneys([]);
    setPage(1);
  };

  const handleMetricTypeChange = (value: "sum" | "count") => {
    setMetricType(value);
    setPage(1);
  };

  const handleViewTypeChange = (value: "table" | "graph") => {
    setViewType(value);
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    setPage(1);
  };

  const handleAttorneysChange = (value: string[]) => {
    setSelectedAttorneys(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const isMetricsLoading = isLoadingPatientStats || isLoadingBillingStats;
  const isTableDataLoading = isLoadingTable || isLoadingAttorneys;

  if (tableError) {
    return (
      <DashboardLayout>
        <Box>
          {isMetricsLoading ? (
            <MetricsCardSkeleton />
          ) : (
            <MetricsGrid data={metricsData || []} sx={{ mb: 2 }} />
          )}
          <Box
            sx={{
              p: 2,
              bgcolor: "error.light",
              color: "error.dark",
              borderRadius: 1,
            }}
          >
            {tableError.message || "Failed to load data"}
          </Box>
        </Box>
      </DashboardLayout>
    );
  }

  const columnLabels = {
    date: "Date",
    attorney: "Attorney",
  };

  return (
    <DashboardLayout>
      <Box>
        {isMetricsLoading ? (
          <MetricsCardSkeleton />
        ) : (
          <MetricsGrid data={metricsData || []} sx={{ mb: 2 }} />
        )}

        <GenericTable
          data={tableData?.results || []}
          primaryKey={tableData?.primaryKey || "date"}
          dataColumns={tableData?.columns || []}
          columnLabels={columnLabels}
          groupByOptions={[
            { value: "locations", label: "By Locations" },
            { value: "attorneys", label: "By Attorneys" },
          ]}
          groupBy={groupBy}
          onGroupByChange={handleGroupByChange}
          filters={[
            ...(groupBy === "attorneys"
              ? [
                  {
                    key: "attorney",
                    label: "Attorneys",
                    options: attorneyOptions,
                    value: selectedAttorneys,
                    onChange: (value: string | string[]) =>
                      handleAttorneysChange(
                        Array.isArray(value) ? value : [value]
                      ),
                    isMultiple: true,
                  },
                ]
              : []),
            {
              key: "dateRange",
              label: "Date Range",
              options: ["Today", "This Week", "This Month", "This Year"],
              value: dateRange,
              onChange: (value: string | string[]) =>
                handleDateRangeChange(Array.isArray(value) ? value[0] : value),
              isMultiple: false,
            },
          ]}
          chartColors={defaultChartColors}
          dataType={metricType}
          onDataTypeChange={handleMetricTypeChange}
          viewType={viewType}
          onViewTypeChange={handleViewTypeChange}
          currentPage={page - 1}
          totalRecords={tableData?.count || 0}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageType="patient-intake"
          isLoading={isTableDataLoading}
        />
      </Box>
    </DashboardLayout>
  );
}
