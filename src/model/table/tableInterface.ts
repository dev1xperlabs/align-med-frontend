
import type { FilterConfig } from "@/components/common/filters/interface/iFilters";
export interface GenericTableProps {
    data: BaseDataRow[];
    primaryKey: string;
    dataColumns: string[];
    columnLabels?: Record<string, string>;
    groupByOptions?: Array<{ value: string; label: string }>;
    groupBy?: string;
    viewType?: "table" | "graph";
    dataType?: "sum" | "count";
    onGroupByChange?: (value: string) => void;
    onViewTypeChange?: (value: "table" | "graph") => void;
    onDataTypeChange?: (value: "sum" | "count") => void;
    filters?: FilterConfig[];
    currentPage?: number;
    totalRecords?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    chartColors?: Record<string, string>;
    hideDataTypeToggle?: boolean;
    pageType?: "patient-intake" | "settlements";
    isLoading?: boolean;
}


interface BaseDataRow {
    [key: string]: string | number;
}
