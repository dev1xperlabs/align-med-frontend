"use client";

import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";

import SimpleToggles from "./SimpleToggles";
import TableGrid from "./tables/TableGrid";
import ChartComponent from "../ChartComponent";
import { TableDataSkeleton, ChartDataSkeleton } from "./LoadingSkeletons";

import { StyledDashboardCard } from "../styled";
import { tableStyles, chartStyles } from "@/styles";
import FilterDropdown from "./filters/FiltersDropdown";
import PaginationControls from "./pagination/PaginationControls";
import { GenericTableProps } from "@/model/table/tableInterface";
import DateRangeDropdowns from "./filters/DateRangeDropdowns";

export default function CustomTable({
  data = [],
  primaryKey,
  dataColumns,
  columnLabels = {},
  groupByOptions = [],
  groupBy = "",
  viewType = "table",
  dataType = "sum",
  onGroupByChange,
  onViewTypeChange,
  onDataTypeChange,
  filters = [],
  currentPage = 0,
  totalRecords = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  chartColors = {},
  hideDataTypeToggle = false,
  pageType = "patient-intake",
  isLoading = false,
  dateRange,
  startDate,
  endDate,
  onDateRangeChange,
  onStartDateChange,
  onEndDateChange,
}: GenericTableProps) {
  const [currentViewType, setCurrentViewType] = useState<"table" | "graph">(
    viewType
  );
  const [currentDataType, setCurrentDataType] = useState<"sum" | "count">(
    dataType
  );

  useEffect(() => {
    setCurrentDataType(dataType);
  }, [dataType]);

  useEffect(() => {
    setCurrentViewType(viewType);
  }, [viewType]);

  const transformedData = useMemo(() => {
    return data;
  }, [data]);

  const tableHeaders = useMemo(() => {
    const primaryLabel = columnLabels[primaryKey] || primaryKey;
    const dataLabels = dataColumns.map((col) => columnLabels[col] || col);
    return [primaryLabel, ...dataLabels];
  }, [primaryKey, dataColumns, columnLabels]);

  const handleViewTypeChange = (value: "table" | "graph") => {
    setCurrentViewType(value);
    onViewTypeChange?.(value);
  };

  const handleDataTypeChange = (value: "sum" | "count") => {
    setCurrentDataType(value);
    onDataTypeChange?.(value);
  };

  const handleGroupByChange = (value: string) => {
    onGroupByChange?.(value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPageSize = Number.parseInt(event.target.value, 10);
    onPageSizeChange?.(newPageSize);
  };

  console.log(groupBy, "settlemets by date ");
  const dateRangeFilter = filters.find((filter) => filter.key === "dateRange");
  const isCustomDateRange =
    dateRangeFilter?.value === "Custom" || groupBy === "month";

  return (
    <>
      <SimpleToggles
        dataType={dataType}
        viewType={viewType}
        onDataTypeChange={handleDataTypeChange}
        onViewTypeChange={handleViewTypeChange}
        hideDataTypeToggle={hideDataTypeToggle}
        groupByOptions={groupByOptions}
        groupBy={groupBy}
        onGroupByChange={handleGroupByChange}
      />

      <StyledDashboardCard>
        <Box sx={tableStyles.controls}>
          <Box sx={tableStyles.controlsLeft}></Box>
          <Box sx={tableStyles.controlsRight}>
            {filters.map((filter) => (
              <Box key={filter.key} sx={tableStyles.filterContainer}>
                <FilterDropdown filter={filter} />
              </Box>
            ))}
            <DateRangeDropdowns
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              isEditable={isCustomDateRange}
              groupBy={groupBy}
            />
          </Box>
        </Box>

        {currentViewType === "table" && (
          <>
            {isLoading ? (
              <TableDataSkeleton />
            ) : (
              <>
                <TableGrid
                  data={transformedData}
                  dataColumns={dataColumns}
                  primaryKey={primaryKey}
                  tableHeaders={tableHeaders}
                  groupBy={groupBy}
                  dataType={dataType}
                />
              </>
            )}
          </>
        )}

        {currentViewType === "graph" && (
          <Box sx={chartStyles.chartWrapper}>
            {isLoading ? (
              <ChartDataSkeleton />
            ) : (
              <ChartComponent
                data={transformedData}
                primaryKey={primaryKey}
                dataColumns={dataColumns}
                columnLabels={columnLabels}
                dataType={dataType}
                colors={chartColors}
                pageType={pageType}
              />
            )}
          </Box>
        )}

        {transformedData.length > 0 && (
          <PaginationControls
            count={totalRecords}
            rowsPerPage={pageSize}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </StyledDashboardCard>
    </>
  );
}
