/**
 * Chart color configurations
 */

export const defaultChartColors = {
    Aliante: "#E91E63",
    Centennial: "#FF9800",
    Nellis: "#9C27B0",
    "Green Valley": "#2196F3",
    Summerlin: "#4CAF50",
    "MRI - Nellis": "#FF5722",
    "Unknown Location": "#607D8B",
    "Adam Kutner": "#E91E63",
    "Benson & Bingham": "#FF9800",
    "Glen Howard": "#9C27B0",
    "Sam & Ash Law": "#2196F3",
    "Vannah & Vannah": "#4CAF50",
    "The Cottner Firm": "#FF5722",
    "Paul Padda Law": "#607D8B",
    "Lerner and Rowe": "#795548",
    "Unknown Attorney": "#B0BEC5",
}

export const attorneyColorPalette = [
    "#E91E63", // Pink/Magenta
    "#FF9800", // Orange
    "#9C27B0", // Purple
    "#2196F3", // Blue
    "#4CAF50", // Green
    "#FF5722", // Deep Orange
    "#607D8B", // Blue Grey
    "#795548", // Brown
    "#B0BEC5", // Grey
    "#00BCD4", // Cyan
    "#8BC34A", // Light Green
    "#FFC107", // Amber
    "#3F51B5", // Indigo
    "#F44336", // Red
    "#009688", // Teal
]

export const settlementChartColors = {
    patient_count: "#2196F3",
    total_billed_charges: "#FF9800",
    total_settlement_amount: "#4CAF50",
    avg_settlement_percentage: "#E91E63",
}

// Generate dynamic colors for attorneys
export const generateAttorneyChartColors = (selectedAttorneys: string[]) => {
    const colorMap: Record<string, string> = {}
    selectedAttorneys.forEach((attorney, idx) => {
        colorMap[attorney] = attorneyColorPalette[idx % attorneyColorPalette.length]
    })
    // Fallback for unknown attorneys
    colorMap["Unknown Attorney"] = "#B0BEC5"
    return colorMap
}

// Generate dynamic colors for settlements with attorney data
export const generateSettlementChartColors = (groupBy: string, currentData: any[]) => {
    const baseColors = settlementChartColors

    // Add dynamic colors for attorney names if we have attorney data
    if (groupBy === "attorneys" && currentData.length > 0) {
        const attorneyColors: Record<string, string> = {}
        currentData.forEach((item: any, index: number) => {
            if (item.attorney) {
                attorneyColors[item.attorney] = attorneyColorPalette[index % attorneyColorPalette.length]
            }
        })

        return { ...baseColors, ...attorneyColors }
    }

    return baseColors
}
