import { TableRow, TableCell } from "@mui/material";
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
} from "@/components/styled";

import { formatCellValue } from "@/utils/currency-helpers";
import { tableStyles } from "@/styles";
import { useEffect } from "react";

export default function TableGrid({
  data,
  dataColumns,
  primaryKey,
  tableHeaders,
  groupBy,
  dataType,
}: iTableGridProps) {
  useEffect(() => {
    console.log("TableGrid rendered with data:", data);
    console.log("TableGrid rendered with dataColumns:", dataColumns);
    console.log("TableGrid rendered with primaryKey:", primaryKey);
  }, [data, dataColumns, primaryKey]);
  const renderTableRows = () => {
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={tableHeaders.length} sx={tableStyles.noDataCell}>
            No {groupBy === "locations" ? "location" : "attorney"} data
            available for the selected{" "}
            {dataType === "count" ? "patient count" : "billing"} criteria and
            date range.
          </TableCell>
        </TableRow>
      );
    }

    return data.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row[primaryKey]}</TableCell>
        {dataColumns.map((column) => (
          <TableCell
            key={column}
            sx={{ fontWeight: row[column] == "-" ? 900 : "normal" }}
          >
            {formatCellValue(row[column])}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>{renderTableRows()}</StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}
