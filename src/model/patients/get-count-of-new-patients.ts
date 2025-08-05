import { iPagination } from "../pagination/iPagination.interface";

export interface iGetCountOfNewPatientsByLocationResponse {
    getCountOfNewPatientsByLocation: any[];
    totalRecords: number;
    currentPage: number;
}



export interface iGetCountOfNewPatientsByAttorneys extends iPagination {
    attorney_ids?: number[]
}



