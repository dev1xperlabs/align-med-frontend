import { iPagination } from "../pagination/iPagination.interface";

export interface iGetSumOfNewPatientsByLocationResponse {
    getSumOfNewPatientsByLocation: any[];
    totalRecords: number;
    currentPage: number;
}




export interface iGetSumOfNewPatientsByAttorneys extends iPagination {
    attorney_ids?: number[]
}