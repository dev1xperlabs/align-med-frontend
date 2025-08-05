"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ToggleButton } from "@mui/material";
import {
  StyledAlignedToggleContainer,
  StyledGroupByToggleButtonGroup,
  StyledDataTypeToggleButtonGroup,
  StyledViewTypeToggleButtonGroup,
} from "../styled/StyledComponents";

interface SimpleTogglesProps {
  dataType?: "count" | "sum";
  viewType?: "table" | "graph";
  onDataTypeChange?: (value: "count" | "sum") => void;
  onViewTypeChange?: (value: "table" | "graph") => void;
  hideDataTypeToggle?: boolean;
  groupByOptions?: Array<{
    value: string;
    label: string;
  }>;
  groupBy?: string;
  onGroupByChange?: (value: string) => void;
}

export default function SimpleToggles({
  dataType = "sum",
  viewType = "table",
  onDataTypeChange,
  onViewTypeChange,
  hideDataTypeToggle = false,
  groupByOptions = [],
  groupBy = "",
  onGroupByChange,
}: SimpleTogglesProps) {
  const [selectedDataType, setSelectedDataType] = useState<"count" | "sum">(
    dataType
  );
  const [selectedViewType, setSelectedViewType] = useState<"table" | "graph">(
    viewType
  );

  useEffect(() => {
    setSelectedDataType(dataType);
  }, [dataType]);

  useEffect(() => {
    setSelectedViewType(viewType);
  }, [viewType]);

  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "count" | "sum"
  ) => {
    if (newValue !== null) {
      setSelectedDataType(newValue);
      onDataTypeChange?.(newValue);
    }
  };

  const handleViewTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "table" | "graph"
  ) => {
    if (newValue !== null) {
      setSelectedViewType(newValue);
      onViewTypeChange?.(newValue);
    }
  };

  const handleGroupByChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (newValue !== null) {
      onGroupByChange?.(newValue);
    }
  };

  return (
    <StyledAlignedToggleContainer sx={{ marginTop: 4, marginBottom: 4 }}>
      {groupByOptions.length > 0 && (
        <StyledGroupByToggleButtonGroup
          value={groupBy}
          exclusive
          onChange={handleGroupByChange}
          aria-label="group by"
        >
          {groupByOptions.map((option) => (
            <ToggleButton
              key={option.value}
              value={option.value}
              aria-label={option.label}
            >
              {option.label}
            </ToggleButton>
          ))}
        </StyledGroupByToggleButtonGroup>
      )}

      {!hideDataTypeToggle && (
        <StyledDataTypeToggleButtonGroup
          value={selectedDataType}
          exclusive
          onChange={handleDataTypeChange}
          aria-label="data type"
        >
          <ToggleButton value="count" aria-label="count">
            Count
          </ToggleButton>
          <ToggleButton value="sum" aria-label="sum">
            Sum
          </ToggleButton>
        </StyledDataTypeToggleButtonGroup>
      )}

      <StyledViewTypeToggleButtonGroup
        value={selectedViewType}
        exclusive
        onChange={handleViewTypeChange}
        aria-label="view type"
      >
        <ToggleButton value="table" aria-label="table">
          Table
        </ToggleButton>
        <ToggleButton value="graph" aria-label="graph">
          Graph
        </ToggleButton>
      </StyledViewTypeToggleButtonGroup>
    </StyledAlignedToggleContainer>
  );
}
