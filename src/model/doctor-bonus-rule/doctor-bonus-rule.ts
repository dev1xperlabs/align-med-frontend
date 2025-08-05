export interface DoctorBonusRule {
    id: string
    provider_id: number
    bonus_percentage: string
    status: string
    created_at: string
    updated_at: string
    attorney_ids: string[]
    rule_name?: string
}

export interface CreateDoctorBonusRule {
    rule: {
        provider_id: number
        bonus_percentage: number
        status: string
        rule_name: string
    }
    rule_attorney_mapping: Array<{
        attorney_id: number
    }>
}

export interface UpdateDoctorBonusRule {
    rule: {
        provider_id: number
        bonus_percentage: number
        status: string
        rule_name: string
    }
    rule_attorney_mapping: Array<{
        attorney_id: number
    }>
}
