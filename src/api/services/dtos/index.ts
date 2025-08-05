

export interface PatientCountSummaryByAttorney {
    visit_date: string
    attorney_id: string
    attorney_name: string
    total_patient_visits?: string
}

export interface PatientSumSummaryByAttorney {
    billed_date: string
    attorney_id: string
    attorney_name: string
    total_billed_charges: string
}

// Updated query parameter interfaces to support multiple values
export interface CountSummaryByLocationParams {
    page_size?: number
    page_number?: number
    start_date?: string | null
    end_date?: string | null
}

export interface VisitSummaryByLocationParams {
    page_size?: number
    page_number?: number
    start_date?: string | null
    end_date?: string | null
}

export interface CountSummaryByAttorneyParams {
    attorney_ids?: number[] // Updated to support multiple attorney IDs
    page_size?: number
    page_number?: number
    start_date?: string | null
    end_date?: string | null
}

export interface SumSummaryByAttorneyParams {
    attorney_ids?: number[] // Updated to support multiple attorney IDs
    page_size?: number
    page_number?: number
    start_date?: string | null
    end_date?: string | null
}

// Settlements interfaces
export interface SettlementsByMonth {
    settlement_date_formatted: string
    patient_count: string
    total_billed_charges: string
    total_settlement_amount: string
    avg_settlement_percentage: string
}

export interface SettlementsByAttorney {
    attorney_id: number[]
    attorney_name: string
    settlement_date_formatted: string
    patient_count: string
    total_billed_charges: string
    total_settlement_amount: string
    avg_settlement_percentage: string
}

// Doctor and Attorney interfaces for dropdowns and mapping
// export interface Doctor {
//     id: number
//     name: string
// }

// export interface Attorney {
//     id: number
//     name: string
// }

// // Doctor bonus rules interfaces - Updated to match new API structure
// export interface DoctorBonusRule {
//     id: string
//     provider_id: number
//     bonus_percentage: string
//     status: string
//     created_at: string
//     updated_at: string
//     attorney_ids: string[]
//     rule_name?: string
// }



// export interface CalculateBonusRequest {
//     fromDate: string
//     toDate: string
//     rule_id: any
// }

// // New interface for bonus calculation response
// export interface BonusCalculationResult {
//     rule_id: number
//     rule_name: string
//     provider_id: number
//     attorney_name: string
//     billed_date: string
//     bonus_percentage: string
//     attorney_id: number
//     total_billed_charges: string
//     bonus_amount: string
// }

// New interfaces for metric cards
export interface PatientCountSummary {
    new_patients_today: number
    new_patients_this_week: number
    new_patients_this_month: number
    new_patients_this_year: number
}

export interface BillingSummary {
    total_billed_today: string
    total_billed_this_week: string
    total_billed_this_month: string
    total_billed_this_year: string
}

// New interface for Settlements Billing Cards
export interface SettlementsBillingCards {
    total_billed_today: string
    total_billed_this_week: string
    total_billed_this_month: string
    total_billed_this_year: string
}

// Updated interfaces for settlements filtering with multiple attorney support
export interface GetSettlementSummaryGroupedParams {
    group_by?: string // 'month', 'week', 'year'
    page_size?: number
    page_number?: number
    attorney_ids?: number[] // Updated to support multiple attorney IDs
}

export interface SettlementSummaryGrouped {
    settlement_date_formatted: string
    patient_count: string
    total_billed_charges: string
    total_settlement_amount: string
    avg_settlement_percentage: string
}



export interface ApiError {
    message: string
    errors?: Record<string, string[]>
}

