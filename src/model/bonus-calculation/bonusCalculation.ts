export interface iCalculateBonusRequest {
    fromDate: string
    toDate: string
    rule_id: any
}

// New interface for bonus calculation response
export interface iBonusCalculationResult {
    rule_id: number
    rule_name: string
    provider_id: number
    attorney_name: string
    billed_date: string
    bonus_percentage: string
    attorney_id: number
    total_billed_charges: string
    bonus_amount: string
}


