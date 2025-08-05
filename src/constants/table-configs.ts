/**
 * Table configuration constants
 */

export const COLUMN_LABELS = {
    // Common labels
    attorney: "Attorney",
    date: "Date",
    period: "Period",

    // Patient intake labels
    patient_count: "Count Of Patients",
    total_billed_charges: "Sum Of Bill Charges",

    // Settlement labels
    total_settlement_amount: "Sum Of Settlement Amount",
    avg_settlement_percentage: "Settlement Percentage",
}

export const GROUP_BY_OPTIONS = {
    PATIENT_INTAKE: [
        {
            value: "locations",
            label: "By Locations",
        },
        {
            value: "attorneys",
            label: "By Attorneys",
        },
    ],
    SETTLEMENTS: [
        {
            value: "month",
            label: "By Month",
        },
        {
            value: "attorneys",
            label: "By Attorneys",
        },
    ],
}

export const DATE_RANGE_OPTIONS = {
    PATIENT_INTAKE: ["Today", "This Week", "This Month", "This Year"],
    SETTLEMENTS: ["month", "week", "year"],
}
