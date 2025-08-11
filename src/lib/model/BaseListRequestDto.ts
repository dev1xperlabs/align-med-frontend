export interface BaseListRequestDto<T> {
  success?: boolean;
  result?: T[];
  totalRecords?: number;
  filteredRecords?: number;
  startIndex?: number;
  pageSize?: number;
  sortColumn?: string;
  sortOrder?: "ASC" | "DESC";
  searchKeyword?: string;
}
