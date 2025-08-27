/**
 * Metrics data transformation utilities
 */

import type { MetricData } from "@/components/common/MetricCard"
import { formatCurrencyCompact } from "./currency-helpers"

export const transformPatientCountData = (data: any): MetricData[] => {
    if (!data) return []


    return [
        {
            title: "Yesterday",
            value: data.new_patients_today || 0,
            change: data.percentage_today || 0,
            trend: data.trend_today,
            customSubText: "Patients",
        },
        {
            title: "This Week",
            value: data.new_patients_this_week || 0,
            change: data.percentage_week || 0,
            trend: data.trend_week,
            customSubText: "Patients",
        },
        {
            title: "This Month",
            value: data.new_patients_this_month || 0,
            change: data.percentage_month || 0,
            trend: data.trend_month,
            customSubText: "Patients",
        },
        {
            title: "This Year",
            value: data.new_patients_this_year || 0,
            change: data.percentage_year || 0,
            trend: data.trend_year,
            customSubText: "Patients",
        },
    ]
}

export const transformBillingData = (data: any): MetricData[] => {
    if (!data) return []


    return [
        {
            title: "Yesterday",
            value: formatCurrencyCompact(data.total_billed_today || "0"),
            change: data.percentage_today || 0,
            trend: data.trend_today,
            customSubText: "Bill Charges",
        },
        {
            title: "This Week",
            value: formatCurrencyCompact(data.total_billed_this_week || "0"),
            change: data.percentage_week || 0,
            trend: data.trend_week,
            customSubText: "Bill Charges",
        },
        {
            title: "This Month",
            value: formatCurrencyCompact(data.total_billed_this_month || "0"),
            change: data.percentage_month || 0,
            trend: data.trend_month,
            customSubText: "Bill Charges",
        },
        {
            title: "This Year",
            value: formatCurrencyCompact(data.total_billed_this_year || "0"),
            change: data.percentage_year || 0,
            trend: data.trend_year,
            customSubText: "Bill Charges",
        },
    ]
}

export const transformSettlementsBillingCards = (data: any): MetricData[] => {
    if (!data) return []
    console.log("Transforming patient settlements data:", data)
    return [
        {
            title: "Yesterday",
            value: formatCurrencyCompact(data.total_billed_today || "0"),
            change: data.percentage_today || 0,
            trend: data.trend_today,
            customSubText: "Settlements",
        },
        {
            title: "This Week",
            value: formatCurrencyCompact(data.total_billed_this_week || "0"),
            change: data.percentage_week || 0,
            trend: data.trend_week,
            customSubText: "Settlements",
        },
        {
            title: "This Month",
            value: formatCurrencyCompact(data.total_billed_this_month || "0"),
            change: data.percentage_month || 0,
            trend: data.trend_month,
            customSubText: "Settlements",
        },
        {
            title: "This Year",
            value: formatCurrencyCompact(data.total_billed_this_year || "0"),
            change: data.percentage_year || 0,
            trend: data.trend_year,
            customSubText: "Settlements",
        },
    ]
}
