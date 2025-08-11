import { iPagination } from "../pagination/iPagination.interface";
import { GroupBy } from "./enums/groupBy";

export interface iGetSettlementsByAttorneys extends iPagination {
    attorney_ids?: number[];
}