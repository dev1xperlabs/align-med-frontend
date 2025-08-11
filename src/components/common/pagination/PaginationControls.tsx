import { TablePagination } from "@mui/material";
import { tableStyles } from "@/styles";

export default function PaginationControls({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: iPaginationControlsProps) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 15]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      sx={tableStyles.pagination}
    />
  );
}
