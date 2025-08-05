export interface iPagination {
    page_size?: number;
    page_number?: number;
    start_date?: string; // ISO string e.g., '2025-08-01'
    end_date?: string;
    total_records?: number;
}
