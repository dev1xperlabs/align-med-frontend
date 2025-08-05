import { iPagination } from "../pagination/iPagination.interface";
import { GroupBy } from "./enums/groupBy";

export interface iGetSettlementsByAttorneys extends iPagination {
    group_by?: GroupBy;
    attorney_ids?: number[];
}