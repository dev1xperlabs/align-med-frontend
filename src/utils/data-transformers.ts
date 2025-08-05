/**
 * Data transformation utilities
 */

// Transform location data from API to table format
export const transformLocationData = (apiData: any[], useRevenue = false): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    // Group by date
    const groupedByDate = apiData.reduce((acc: any, item: any) => {
        const date = item.visit_date || "Unknown Date"
        if (!acc[date]) {
            acc[date] = { date: date }
        }

        // Use location_name as the key and either total_revenue or total_patient_visits as the value
        const locationName = item.location_name || "Unknown Location"
        const value = useRevenue
            ? Number.parseFloat(item.total_revenue || "0")
            : Number.parseInt(item.total_patient_visits || "0")

        acc[date][locationName] = value

        return acc
    }, {})

    return Object.values(groupedByDate) as Record<string, any>[]
}

// Transform attorney data from API to table format
export const transformAttorneyData = (apiData: any[], type: "count" | "sum"): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    if (type === "count") {
        const groupedByAttorney = apiData.reduce((acc: any, item: any) => {
            const attorneyName = item.attorney_name
            if (!acc[attorneyName]) {
                acc[attorneyName] = { attorney: attorneyName }
            }
            const visits = item.total_patient_visits ? Number.parseInt(item.total_patient_visits) : 1
            acc[attorneyName][item.visit_date] = visits
            return acc
        }, {})
        return Object.values(groupedByAttorney) as Record<string, any>[]
    } else {
        const groupedByAttorney = apiData.reduce((acc: any, item: any) => {
            const attorneyName = item.attorney_name || "Unknown Attorney"
            const billedDate = item.billed_date || "Unknown Date"
            const totalBilledCharges = Number.parseFloat(item.total_billed_charges || "0")

            if (!acc[attorneyName]) {
                acc[attorneyName] = { attorney: attorneyName }
            }
            acc[attorneyName][billedDate] = `${totalBilledCharges.toFixed(2)}`
            return acc
        }, {})
        return Object.values(groupedByAttorney) as Record<string, any>[]
    }
}

// Transform attorney data for chart display
export const transformAttorneyDataForChart = (apiData: any[], type: "count" | "sum"): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    if (type === "count") {
        const groupedByDate = apiData.reduce((acc: any, item: any) => {
            const date = item.visit_date || "Unknown Date"
            const attorneyName = item.attorney_name || "Unknown Attorney"

            if (!acc[date]) {
                acc[date] = { date: date }
            }

            const visits = item.total_patient_visits ? Number.parseInt(item.total_patient_visits) : 1
            acc[date][attorneyName] = visits
            return acc
        }, {})
        return Object.values(groupedByDate) as Record<string, any>[]
    } else {
        const groupedByDate = apiData.reduce((acc: any, item: any) => {
            const date = item.billed_date || "Unknown Date"
            const attorneyName = item.attorney_name || "Unknown Attorney"
            const totalBilledCharges = Number.parseFloat(item.total_billed_charges || "0")

            if (!acc[date]) {
                acc[date] = { date: date }
            }
            acc[date][attorneyName] = totalBilledCharges
            return acc
        }, {})
        return Object.values(groupedByDate) as Record<string, any>[]
    }
}

// Transform monthly settlements data
export const transformMonthlySettlementsData = (apiData: any[]): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    return apiData.map((item) => ({
        period: item.settlement_date_formatted,
        patient_count: Number.parseInt(item.patient_count || "0"),
        total_billed_charges: Number.parseFloat(item.total_billed_charges || "0"),
        total_settlement_amount: Number.parseFloat(item.total_settlement_amount || "0"),
        avg_settlement_percentage: Math.round(Number.parseFloat(item.avg_settlement_percentage || "0")),
    }))
}

// Transform attorney settlements data for table
export const transformAttorneySettlementsData = (apiData: any[]): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    const groupedByAttorney = apiData.reduce((acc: any, item: any) => {
        const attorneyName = item.attorney_name || `Attorney ${item.attorney_id}`
        if (!acc[attorneyName]) {
            acc[attorneyName] = { attorney: attorneyName }
        }

        const settlementAmount = Number.parseFloat(item.total_settlement_amount || "0")
        acc[attorneyName][item.settlement_date_formatted] = settlementAmount

        return acc
    }, {})

    return Object.values(groupedByAttorney) as Record<string, any>[]
}

// Transform attorney settlements data for chart
export const transformAttorneySettlementsDataForChart = (apiData: any[]): Record<string, any>[] => {
    if (!apiData || apiData.length === 0) return []

    const groupedByDate = apiData.reduce((acc: any, item: any) => {
        const date = item.settlement_date_formatted || "Unknown Date"
        const attorneyName = item.attorney_name || `Attorney ${item.attorney_id}`
        const settlementAmount = Number.parseFloat(item.total_settlement_amount || "0")

        if (!acc[date]) {
            acc[date] = { date: date }
        }
        acc[date][attorneyName] = settlementAmount
        return acc
    }, {})

    return Object.values(groupedByDate) as Record<string, any>[]
}

// Get unique columns from data
export const getDataColumns = (data: Record<string, any>[], primaryKey: string): string[] => {
    if (!data || data.length === 0) return []

    // Collect all unique keys except the primaryKey
    const columnSet = new Set<string>()
    data.forEach((row) => {
        Object.keys(row).forEach((key) => {
            if (key !== primaryKey) {
                columnSet.add(key)
            }
        })
    })
    return Array.from(columnSet)
}
